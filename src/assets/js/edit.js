var formId = 0;
var coalitionSelectOptions = '';
var name = '';


function getCoalitionNameFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('name');
}

                    

const generateInputAccountForm = (id) => `
    <form action="/api/db/accounts/insert" method="POST" class="form-add" id="form-${id}" onsubmit="save_account(event)">
        <input type="text" class="form-control" id="handle-${id}" maxlength="32" minlength="2" autocomplete="off" pattern="^[@]?[A-Za-z]*$" placeholder="e.g. @JohnDoe" required>
        <div class="btn-group" role="group">
            <button type="submit" class="btn btn-success">Save &nbsp;<i class='fas fa-thumbs-up'></i></button>
            <button type="button" class="btn btn-danger" onclick="delete_form(${id})">Undo &nbsp;<i class='fas fa-window-close'></i></button>
        </div>
    </form>`; 

const generateEditAccountRow = (handle) => `
    <td>@${handle}</td>
    <td><select id="coalition-${handle}">${coalitionSelectOptions}</select></td>
    <td>
        <div class="btn-group" role="group">
            <button type="submit" class="btn btn-success" onclick="save_edit('${handle}')"><i class="fas fa-thumbs-up"></i></button>
            <button type="button" class="btn btn-danger" onclick="refresh()"><i class='fas fa-window-close'></i></button>
        </div>
    </td>`;

const generateAccountRow = (handle, coalition) => `
    <tr id="account-${handle}">
        <td>@${handle}</td>
        <td>${coalition}</td>
        <td>
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-primary" onclick="edit_account('${handle}')"><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" class="btn btn-danger" onclick="delete_account('${handle}')"><i class='fas fa-trash-alt'></i></button>
            </div>
        </td>
    </tr>`;



const add_form = () => $('.table-responsive').append(generateInputAccountForm(formId++));

const delete_form = (id) => $(`#form-${id}`).remove();

const edit_account = (name) => $(`#account-${name}`).html(generateEditAccountRow(name));



async function refresh() {
    $('#accounts-body').empty();
    const accounts = await httpGet('/api/db/accounts');
    let coalitions = new Set();

    accounts.forEach((acc) => {
        if (acc.political_coalition === name) $('#accounts-body').append(generateAccountRow(acc.handle, name));
        coalitions.add(acc.political_coalition);
    });

    coalitionSelectOptions = '<option disabled selected>Choose...</option>';
    coalitions.forEach((co) => coalitionSelectOptions += `<option>${co}</option>`);
}

async function delete_account(handle) {
    const res = await httpPost(`/api/db/accounts/${handle}/delete`);
    if (res.message !== 'OK') alert('Error: ' + res.message);
    refresh();
}

async function save_edit(handle) {
    const new_coalition = $(`#coalition-${handle}`).val(); 
    const res = await httpPost(`/api/db/accounts/${handle}/update`, { coalition: new_coalition });
    if (res.message !== 'OK') alert('Error: ' + res.message);
    refresh();
}

async function save_account(event) {
    try {
        event.preventDefault();

        const id = event.target.id.split('-')[1];
        const handle = $('#handle-' + id).val();

        const check = await httpGet(`/api/twitter/${handle}/check`);
        if (check.message !== 'OK') throw "Handle does not exists on Twitter";

        const res = await httpPost('/api/db/accounts/insert', {handle: handle, coalition: name});
        if (res.message !== 'OK') throw res.message;

        delete_form(id);
        refresh();
    }
    catch(err) { alert('Error: ' + err); }
}



$(document).ready(async () => {
    try {
        name = getCoalitionNameFromUrl();
        const res = await httpGet(`/api/coalitions/${name}/profile`);

        if ('message' in res)
            throw "Coalition does not contain accounts";

        $('#name').text(res.name);
        $('#color').css('background', res.color);

        await refresh();
        finishLoading();
    }
    catch (err) { errorInLoading(err); } 
});