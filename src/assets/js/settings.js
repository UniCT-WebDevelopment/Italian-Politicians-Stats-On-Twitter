var form_id = 0;

                    

const generateInputCoalitionForm = (id) => `
    <form action="/api/db/coalitions/insert" method="POST" class="form-add" id="form-${id}" onsubmit="save_coalition(event)">
        <input type="text" class="form-control" id="name-${id}" maxlength="32" minlength="2" autocomplete="off" pattern="^[A-Za-z]*$" placeholder="Coalition Name..." required>
        <input type="color" class="form-control" id="color-${id}" value="#96C5F7" required>
        <div class="btn-group" role="group">
            <button type="submit" class="btn btn-success">Save &nbsp;<i class='fas fa-thumbs-up'></i></button>
            <button type="button" class="btn btn-danger" onclick="delete_form(${id})">Undo &nbsp;<i class='fas fa-window-close'></i></button>
        </div>
    </form>`;           

const generateEditCoalitionRow = (name) => `
    <td>${name}</td>
    <td><input type="color" class="form-control" id="color-${name}" value="#96C5F7"></td>
    <td>
        <div class="btn-group" role="group">
            <button type="submit" class="btn btn-success" onclick="save_edit('${name}')"><i class='fas fa-thumbs-up'></i></button>
            <button type="button" class="btn btn-danger" onclick="refresh()"><i class='fas fa-window-close'></i></button>
        </div>
    </td>`;

const generateCoalitionRow = (name, color) => `
    <tr id="coalition-${name}">
        <td>${name}</td>
        <td><div class="color" style="background: ${color}"></div></td>
        <td>
            <div class="btn-group" role="group">
                <button type="submit" class="btn btn-primary" onclick="edit_coalition('${name}')"><i class='fa-solid fa-pen-to-square'></i></button>
                <button type="button" class="btn btn-danger" onclick="delete_coalition('${name}')"><i class='fas fa-trash-alt'></i></button>
            </div>
        </td>
        <td></td>
    </tr>`;



const add_form = () => $('.table-responsive').append(generateInputCoalitionForm(form_id++));

const delete_form = (id) => $(`#form-${id}`).remove();

const edit_coalition = (name) => $(`#coalition-${name}`).html(generateEditCoalitionRow(name));



async function refresh() {
    $('#coalitions-body').empty();
    const coalitions = await httpGet('/api/db/coalitions');
    coalitions.forEach((co) => $('#coalitions-body').append(generateCoalitionRow(co.name, co.logo_color)));
}

async function delete_coalition(name) {
    const res = await httpPost(`/api/db/coalitions/${name}/delete`);
    if (res.message !== 'OK') alert('Error: ' + res.message);
    refresh();
}

async function save_edit(name) {
    const new_color = $(`#color-${name}`).val(); 
    const res = await httpPost(`/api/db/coalitions/${name}/update`, { logo_color: new_color });
    if (res.message !== 'OK') alert('Error: ' + res.message);
    refresh();
}

async function save_coalition(event) {
    event.preventDefault();

    const id = event.target.id.split('-')[1];
    const name = $('#name-' + id).val().toUpperCase().trim();
    const color = $('#color-' + id).val();

    const res = await httpPost('/api/db/coalitions/insert', {name: name, logo_color: color});
    if (res.message !== 'OK') alert('Error: ' + res.message);
    
    delete_form(id);
    refresh();
}



$(document).ready(async () => {
    await refresh();
    finishLoading();
});