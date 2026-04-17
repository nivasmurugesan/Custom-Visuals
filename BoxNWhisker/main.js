function generateCustomVisual(container, data, metadata) {
    createZohoChart(container, generateDataForCustomChart(data, metadata));
}

function convertTableDataToGroupedData(dataFrames) {
    let dataGrouped = {};

    dataFrames.reduce((prev, curr) => {
        if (!dataGrouped[curr[0]]) {
            dataGrouped[curr[0]] = [];
        }
        dataGrouped[curr[0]].push(curr[1]);
        return dataGrouped;
    }, {});
    return dataGrouped;
}

function generateDataForCustomChart(data, metaData) {

    let boxplotSeriesdata = new Array(0),
        outlierSeriesdata = new Array(0);
    let dataGrouped = convertTableDataToGroupedData(data);

    let keys = Object.keys(dataGrouped);
    keys.map((key) => {
        let dataFrame = dataGrouped[key];
        let boxplotData = calculateBoxplotData(dataFrame);
        boxplotSeriesdata.push([key, [boxplotData.q1, boxplotData.q3], boxplotData.median, [boxplotData.lowerLimit, boxplotData.upperLimit]]);
        outlierSeriesdata.push(boxplotData.outliers.map((outlier) => [key, outlier]));
    });
    let scatterData = d3.merge(outlierSeriesdata);

    data = {
        'canvas': {
            'title': {
                'show': false
            },
            'subtitle': {
                'show': false
            },
            'border': {
                'size': 0
            },
            'shadow': {
                'show': false
            }
        },
        'seriesdata': {
            'chartdata': [{
                'type': 'boxplot',
                'data': [
                    boxplotSeriesdata
                ]
            }, {
                'type': 'scatter',
                'data': [
                    scatterData
                ]
            }]
        },
        'metadata': {
            'axes': {
                'x': [0],
                'y': [
                    [1]
                ]
            },
            'columns': metaData.columns
        },
        'chart': {
            'plot': {
                'plotoptions': {
                    'boxplot': {
                        'multiColoring': true,
                        'median': {
                            'color': '#FFFFFF'
                        },
                        'whiskers': {
                            'color': '#141212'
                        },
                        'outliers': {},
                        'maxBandWidth': 30,
                        'border': {
                            'show': true,
                            'radius': 5,
                            'size': 1,
                            'color': 'white'
                        },
                        'fillOpacity': 0.6976744186046512
                    }
                }
            },
        },
        'legend': {
            'colorPallete': {
                'options': {
                    'multicolor': 'zoho-reports'
                }
            },
            'highlightEffect': {
                'selectedSeries': 'hatchLeftfill'
            },
            'colors': ['rgba(110,144,237,1)', 'rgba(103,224,200,1)', 'rgba(240,117,132,1)', 'rgba(244,158,87,1)', 'rgba(242,195,95,1)', 'rgba(159,132,219,1)']
        }
    };
    return data;
}

function calculateBoxplotData(data) {
    // Sort data in ascending order
    data.sort((a, b) => a - b);

    const min = data[0];
    const q1 = median(data.slice(0, Math.floor(data.length / 2)));
    const q2 = median(data); // Median
    const q3 = median(data.slice(Math.ceil(data.length / 2)));
    const max = data[data.length - 1];

    // Calculate IQR
    const iqr = q3 - q1;
    const lowerFence = q1 - 1.5 * iqr;
    const upperFence = q3 + 1.5 * iqr;

    // calculatelower, upper limit
    let lowerLimit = data.filter((value) => value >= lowerFence)[0],
        upperLimit = data.filter((value) => value <= upperFence).pop();

    // Identify outliers
    const outliers = data.filter((value) => value < lowerFence || value > upperFence);

    return {
        min,
        q1,
        median: q2,
        q3,
        max,
        outliers,
        lowerLimit,
        upperLimit
    };
}

function median(arr) {
    const mid = Math.floor(arr.length / 2);
    if (arr.length % 2 === 0) {
        return (arr[mid - 1] + arr[mid]) / 2;
    } else {
        return arr[mid];
    }
}

  