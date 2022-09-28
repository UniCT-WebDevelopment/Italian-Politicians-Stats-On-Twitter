function generateChart(chart_type, canvas_id, x_values, y_values, colors, title, legend = true) {
    new Chart(canvas_id, {
        type: chart_type,
        data: {
            aspectRatio: 1,
            labels: x_values,
            datasets: [{
                backgroundColor: colors,
                data: y_values
            }]
        },
        options: {
            legend: {display: legend},
            title: {
                display: true,
                text: title
            }
        }
    });
}


function errorInLoading(msg) {
    $('.loading-page').append('<div class="alert alert-danger" role="alert">Error on loading: ' + msg + '</div>');
}

function finishLoading() {
    $('.loader').animate({opacity: '0'}, 1100);
    $('.loading-page p').animate({opacity: '0'}, 1100);
    setTimeout(() => $('.loading-page').css('display', 'none'), 1100);

    setTimeout(() => { $('.real-page').css('display', 'contents'); }, 1100);
    setTimeout(() => { $('.real-page *').animate({opacity: '1'}, 1000); }, 1100);
}


async function httpGet(url) {
    return await new Promise((resolve, reject) => {
        $.ajax({
            method: 'GET',
            url: url,
            dataType: 'json',
            success: (res) => resolve(res),
            error: (xhr, error, res) => reject(xhr.responseJSON.message)
        });
    });
}

async function httpPost(url, body = {}) {
    return await new Promise((resolve, reject) => {
        $.ajax({
            method: 'POST',
            url: url,
            data: body,
            dataType: 'json',
            success: (res) => resolve(res),
            error: (xhr, error, res) => reject(xhr.responseJSON)
        });
    });
}