async function generateCustomVisual(container, data, metadata) {
  let data_length = data.length;
  let height = parseInt(container.style.height) / data_length;

  for(let i = 0; i < data_length; i++) {
    const div = document.createElement('div');
    div.id = `chart-container-${i + 1}`;
    div.style.height = height + 'px';
    container.appendChild(div);
    await $ZC.charts(div, transformData(data[i], metadata[i]));
  }
}


function transformData(data, metadata) {
    return {
        "seriesdata": {
          "chartdata": [{
            "type": "bullet",
            "data": [
              [ data ]
            ]
          }]
        },
        "metadata": {
          "axes": {
            "x": [0],
            "y": [
              [1]
            ],
            "tooltip": ["<span style='font-size:22px;'>{{val(1)}}</span><span style='color:grey;font-size:10px'>&nbsp&nbsp{{val(0)}}</span></br>", "<table cellspacing='0' cellpadding='0'><tbody><tr style='vertical-align: top;'><td>50%</td><td>&nbsp&nbsp-&nbsp&nbspOK</td></tr><tr style='vertical-align: top;'><td>75%</td><td>&nbsp&nbsp-&nbsp&nbspGood</td></tr><tr style='vertical-align: top;'><td>100%</td><td>&nbsp&nbsp-&nbsp&nbspExcellent</td></tr></tbody></table>"]
          },
          "columns": [{
            "dataindex": 0,
            "columnname": "x",
            "datatype": "ordinal"
          }, {
            "dataindex": 1,
            "columnname": "Market Share",
            "datatype": "numeric"
          }]
        },
        "chart": {
          "axes": {
            "rotated": true,
            "xaxis": {
              "label": {
                "show": false
              },
              "axisline": {
                "show": false
              }
            },
            "yaxis": [{
              "label": {
                "text": "Percentage (in %)"
              },
              "grid": {
                "color": "transparent"
              },
              "axisline": {
                "show": false
              }
            }]
          },
          "plot": {
            "plotoptions": {
              "bullet": {
                "levelMarker": {
                  "dataindex": 2,
                  "color": ["rgb(255,0,0)", "rgb(255,255,0)", "rgb(0,255,0)"],
                  "fillOpacity": 0.5,
                  "maxBandWidth": 100
                },
                "targetMarker": {
                  "dataindex": 3,
                  "outerStrokeColor": "#2F4F4F",
                  "dashStyle": "1,1"
                }
              }
            }
          },
          "marginBottom": 0,
          "marginRight": 20
        },
        "legend": {
          "colors": ["#2F4F4F"]
        },
        "tooltip": {
          "backgroundColor": "white",
          "opacity": 1,
          "fontColor": "rgb(0,0,0)",
          "shadow": "2px 2px 2px rgba(0,0,0,0.3)",
          "borderRadius": "1"
        },
        "canvas": {
          "title": {
            "show": false,
            "text": "Horizontal bullet chart"
          },
          "subtitle": {
            "show": false,
            "text": "Bullet chart with target marker and level markers"
          },
          "border": {
            "show": false
          },
        }
    };
  }




