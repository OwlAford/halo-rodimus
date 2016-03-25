<template>
  <article class="chart">
    <h1 class="a">折线图演示</h1>
    <div class="line ui-border-b" v-el:line></div>
    <h1 class="b">柱状图演示</h1>
    <div class="bar ui-border-b" v-el:bar></div>
    <h1 class="c">饼图演示</h1>
    <div class="pie" v-el:pie></div>
  </article>
</template>
<style scoped>
.chart{background-color:#fff;}
.line,.bar,.pie{width:100%; height:3.6rem; padding-bottom:0.2rem;}
h1{padding:0.2rem 0; text-indent:0.1rem; color:#2196F3;}
h1:before{content:'\e61e'; font-family:iconfont; font-size:0.32rem; font-weight:400; line-height:1; display:inline-block; vertical-align:middle; margin-top:-0.04rem; margin-right:0.06rem;}
h1.b{color:#F84724;}
h1.b:before{content:'\e620';}
h1.c{color:#4CAF50;}
h1.c:before{content:'\e621';}
* + h1{margin-top:0.2rem;}
.pie >div{width:50%; height:100%;}
</style>
<script>

export default {
  name: 'chart',

  data () {
    return {
      
    }
  },

  ready () {
    var view = this;
    var els = this.$els;
    var line = els.line;
    var bar = els.bar;
    var pie = els.pie;

    // 初始化头部
    VUX.setHeader({
      title: 'eCharts 组件'
    })

    // 为所有的容器设定固定pixel尺寸
    Array.prototype.forEach.call([line,bar,pie], function(itm){
      //console.log(itm)
      itm.style.height = VUX.utils.matrixing(3.6) + 'px';
    })

    // 渲染折线图
    view.renderLine(line);

    // 渲染柱状图
    view.renderBar(bar);

    // 渲染pie图
    view.renderPie(pie);
  },

  methods: {
    renderLine: function(el){
      var myLine = VUX.echarts.init(el);
      myLine.setOption({
        tooltip: {},
        grid: {
          left: 50,
          right: 20,
          top: 10,
          bottom: 30
        },
        xAxis: [
            {
                axisLine: {
                  lineStyle: {
                    color: '#999',
                    width: 1
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: '#eee',
                    width: 1
                  }
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                },
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis: [
            {   
                axisLine: {
                  show: false
                },
                splitLine: {
                  lineStyle: {
                    color: '#eee',
                    width: 1
                  }
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  lineStyle: {
                    color: '#999',
                    width: 1
                  }
                },
                type: 'value',
                axisLabel: {
                  formatter: '{value} °C'
                }
            }
        ],
        series: [
            {
              name:'上周气温',
              type:'line',
              lineStyle:{
                normal: {
                  color: '#0087FB'
                }
              },
              symbolSize: 8,
              itemStyle: {
                normal: {
                  color: '#0087FB',
                  borderWidth: 1
                }
              },
              areaStyle: {normal: {
                color: '#0087FB',
                opacity: 0.2
              }},
              data:[6, 11, 19, 18, 22, 24, 29]
              
          }
        ]
      });
    },
    renderBar: function(el){
      var myBar = VUX.echarts.init(el);
      myBar.setOption({
          tooltip: {},
          grid: {
            left: 30,
            right: 10,
            top: 10,
            bottom: 30
          },
          xAxis: {
            axisLine: {
              lineStyle: {
                color: '#999',
                width: 1
              }
            },
            splitLine: {
              lineStyle: {
                color: '#eee',
                width: 1
              }
            },
            axisTick: {
              show: false
            },
            data: ["衬衫","西裤","皮鞋","领带","手表","袜子","胸章"]
          },
          yAxis: {
            axisLine: {
              lineStyle: {
                color: '#999',
                width: 1
              }
            },
            splitLine: {
              lineStyle: {
                color: '#eee',
                width: 1
              }
            },
            axisTick: {
              show: false
            },
          },
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 14],
            barWidth: 24,
            itemStyle: {
              normal: {
                color: '#F84724'
              }
            }
          }]
      });
    },
    renderPie: function(el){
      var myPie = VUX.echarts.init(el);
      myPie.setOption({
        backgroundColor: '#2c343c',

        title: {
            text: 'Customized Pie',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },

        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name:'访问来源',
                type:'pie',
                radius : '64%',
                center: ['50%', '50%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:274, name:'联盟广告'},
                    {value:235, name:'视频广告'},
                    {value:400, name:'搜索引擎'}
                ].sort(function (a, b) { return a.value - b.value}),
                roseType: 'angle',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      })
    }

  }
}
</script>