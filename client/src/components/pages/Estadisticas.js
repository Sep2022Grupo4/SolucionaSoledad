import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
export function Stats() {

  const [usersData, setUsersData] = useState(false)
  const [labels, setLabels] = useState([])
  const [dataPop, setDataPop] = useState([])
  const [data, setData] = useState({})

  useEffect(() => {
    async function getUserAsigned() {
      const res = await fetch(`/getUsers`)
      const usersFinded = await res.json()
      setUsersData(usersFinded)
      const localidades = usersFinded.map(element => { return element.location })
      var labelsSet = new Set(localidades)
      var dataLabels = [];
      var labelsb = []
      for  await (let element of labelsSet) {
        const population = localidades.filter(x => x === element).length
        dataLabels.push(population);
        labelsb.push(element)
    }
      setLabels(labelsb)
      setDataPop(dataLabels)
    }
    getUserAsigned();
  })

  useEffect(() => {
    console.log(labels, dataPop)
    if (labels) {
      const datab = {
        labels: labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: dataPop,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
      setData(datab)
    }
  })

  console.log(data)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Usuarios por localidad',
      },
    },
  };


  if (data) {
    return <Bar options={options} data={data} />;
  }
}
