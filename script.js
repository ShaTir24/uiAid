var apiUrl;
// function to fetch data of seats availability and prices using fetch API call
async function fetchTableData() {
    apiUrl = 'https://viaje.ai/seatinfo_api/';
    try {
        const response = await fetch(apiUrl);
        const input_data = await response.json();
        const data = input_data['data']
        const table = document.getElementById('data_table');

        //iterating through every row and creating row element for HTML
        for (var i = 0; i < data.length; i++) {
            var row = `<tr>
                            <td>${data[i].seat_no}</td>
                            <td>${data[i].price}</td>
                            <td>${data[i].status}</td>
                        </tr>`
            table.innerHTML += row;
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

// function to fetch data of trip category using fetch API call
async function fetchGraphData() {
    apiUrl = 'https://viaje.ai/mainvia_api/';
    try {
        const response = await fetch(apiUrl);
        const jsonData = await response.json();

        //initializing the axes data
        const categories = jsonData.data.map(item => item[0]);  //for x axis
        const seriesData = jsonData.data.map(item => [item[1], item[2]]);   //for y axis

        //using highcharts js modules
        Highcharts.chart('chart_plot', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Trip Distribution Chart'
            },
            xAxis: {
                categories: categories,
                title: {
                    text: 'Date'
                }
            },
            yAxis: {
                title: {
                    text: 'Bookings'
                }
            },
            series: [
                {
                    name: 'Via Route',
                    data: seriesData.map(item => item[0])
                },
                {
                    name: 'Main Route',
                    data: seriesData.map(item => item[1])
                }
            ]
        });
    } catch (error) {
        console.error(error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    fetchTableData();
    fetchGraphData();
});