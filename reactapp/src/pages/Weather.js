import { useEffect, useState } from "react";
import Chart, { elements } from 'chart.js/auto';
import "./Weather.css"

function Weather(){
    const [dates,setDates] = useState([]);
    const [temperatureC,setTempC] = useState([]);
    const [temperatureF,setTempD] = useState([]);

    useEffect(()=>{
      console.log("destroying previous chart");
      getResponse();
    })
    const getResponse = async () => {
      const requestOptions = {
        method: "GET"
        }
        const response = await fetch("http://localhost:5098/WeatherForecast",requestOptions);
        if(response.status == "200"){
          await response.json().then(function(data){
                data.forEach(element => {
                    dates.push(element.date.substring(0,(element.date).indexOf('T')));
                    temperatureC.push(element.temperatureC);
                    temperatureF.push(element.temperatureF);
                    let status = Chart.getChart("lineChartCanvas");
                    if(status != undefined){
                      status.destroy();
                      dates.length = 0;
                      temperatureC.length = 0;
                      temperatureF.length =0;
                    }
                })              
            })
            new Chart(document.getElementById("lineChartCanvas"), {
              type: 'line',
              data: {
                labels: dates,
                datasets: [
                  {
                    label: "Temperature in °C",
                    data: temperatureC,
                    borderColor: '#8884d8',
                    fill: false,
                  },
                  {
                    label: "Temperature in °F",
                    data: temperatureF,
                    borderColor: '#FF2D00',
                    fill: false,
                  }
                ],
              },
              options: {
                responsive: true,
                scales: {
                  x: {
                    display: true,
                    min:0,
                    max:dates.length
                  },
                  y: {
                    display: true,
                  },
                },
              },
            });;
        }
    }
    return(
        <div className="main">
            <div className="sub-main">
                <div className="chart-page">
                    {(dates)?(
                        <div  className="chart-Canvas">
                            <canvas className="canvas" id="lineChartCanvas"/>
                        </div>
                    ):(
                        <div  className="chart-Canvas">
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Weather;