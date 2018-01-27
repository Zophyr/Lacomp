import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { API_AIR_NOW, API_WEATHER_NOW, IMAGE_SERVER } from '../../constant/urls'

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isRefreshing: false,
            weather_now: {},

            // 所在城市
            city: '广州',
            // 温度
            temperature: 27,
            // 体感温度
            feel_like: 24,
            // 天气状况
            weather_text: '晴',
            // 天气状况编码
            weather_code: 100,
            // 风向
            wind_direction: '西风',
            // 风力
            wind_power: '微风',
            // 风速
            wind_speed: 6,
            // 相对湿度
            humidity: 73,
            // 降水量
            precipitation: 0,
            // 大气压强
            atmospheric_pressure: 1024,
            // 能见度
            visibility: 12,
            // 云量
            cloud: 64,
            // 空气质量指数
            aqi: 34,
            // 空气质量
            qlty: '优'
        }
    }

    render() {
        let weather_icon = IMAGE_SERVER + this.state.weather_code + '.png';

        return (
            <View>
                <Image source={{ uri: weather_icon }} style={{ width: 100, height: 100 }}/>
                <Text> fuck {this.state.cloud} </Text>
            </View>
        );

    }

    componentDidMount() {
        this.setupData(this.state.city);
    }



    setupData(cityName) {
        let apiOfWeatherNow = API_WEATHER_NOW + cityName;

        fetch(apiOfWeatherNow)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    weather_now: responseJson.HeWeather6[0].now,

                    // 温度
                    temperature: responseJson.HeWeather6[0].now.tmp,

                    // 体感温度
                    feel_like: responseJson.HeWeather6[0].now.fl,

                    // 天气状况
                    weather_text: responseJson.HeWeather6[0].now.cond_txt,

                    // 天气状况编码
                    weather_code: responseJson.HeWeather6[0].now.cond_code,

                    // 风向
                    wind_direction: responseJson.HeWeather6[0].now.wind_dir,

                    // 风力
                    wind_power: responseJson.HeWeather6[0].now.wind_sc,

                    // 风速
                    wind_speed: responseJson.HeWeather6[0].now.wind_spd,

                    // 相对湿度
                    humidity: responseJson.HeWeather6[0].now.hum,

                    // 降水量
                    precipitation: responseJson.HeWeather6[0].now.pcpn,

                    // 大气压强
                    atmospheric_pressure: responseJson.HeWeather6[0].now.pres,

                    // 能见度
                    visibility: responseJson.HeWeather6[0].now.vis,

                    // 云量
                    cloud: responseJson.HeWeather6[0].now.cloud
                })
            })
            .catch((error) => {
                console.error(error);
            });

        let apiOfAirNow = API_AIR_NOW + cityName;
        fetch(apiOfAirNow)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    // 空气质量指数
                    aqi: responseJson.HeWeather6[0].air_now_city.aqi,

                    // 空气质量
                    qlty: responseJson.HeWeather6[0].air_now_city.qlty,
                })
            })
    }


}

export default Main;