import Chart from 'chart.js';
import Component from '@ember/component';

const WEIGHT_CALORIES_DATA = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
  datasets: [
    {
      data: [245, 244.5, 247, 247],
      label: 'Weight',
      borderColor: '#3e95cd',
      fill: false,
      yAxisID: 'first-y-axis',
    },
    {
      data: [2820, 2700, 2750, 2200, 3001],
      label: 'Calories',
      borderColor: '#8e5ea2',
      fill: false,
      yAxisID: 'second-y-axis',
    },
  ],
};
const WEIGHT_CALORIES_OPTIONS = {
  title: {
    display: true,
    text: 'Weight, Calories, Macros',
  },
  scales: {
    yAxes: [
      {
        id: 'first-y-axis',
        type: 'linear',
      },
      {
        id: 'second-y-axis',
        type: 'linear',
      },
    ],
  },
};

const CALORIES_MACROS_DATA = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
  datasets: [
    {
      data: [2820, 2700, 2750, 2200, 3001],
      label: 'Calories',
      borderColor: '#8e5ea2',
      fill: false,
      yAxisID: 'second-y-axis',
    },
    {
      data: [67, 77, 70, 69, 80],
      label: 'Fats',
      borderColor: '#3cba9f',
      fill: false,
      yAxisID: 'third-y-axis',
    },
    {
      data: [190, 180, 190, 190, 200],
      label: 'Proteins',
      borderColor: '#e8c3b9',
      fill: false,
      yAxisID: 'third-y-axis',
    },
    {
      data: [200, 201, 200, 190, 200],
      label: 'Carbs',
      borderColor: '#c45850',
      fill: false,
      yAxisID: 'third-y-axis',
    },
  ],
};
const CALORIES_MACROS_OPTIONS = {
  title: {
    display: true,
    text: 'Weight, Calories',
  },
  scales: {
    yAxes: [
      {
        id: 'second-y-axis',
        type: 'linear',
      },
      {
        id: 'third-y-axis',
        type: 'linear',
      },
    ],
  },
};
export default Component.extend({
  didInsertElement() {
    let ctx1 = document.getElementById('myChart1').getContext('2d');
    let _myChart1 = new Chart(ctx1, {
      type: 'line',
      data: WEIGHT_CALORIES_DATA,
      options: WEIGHT_CALORIES_OPTIONS,
    });

    let ctx2 = document.getElementById('myChart2').getContext('2d');
    let _myChart2 = new Chart(ctx2, {
      type: 'line',
      data: CALORIES_MACROS_DATA,
      options: CALORIES_MACROS_OPTIONS,
    });
  },
});
