import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import {API_AIR_NOW, API_WEATHER_NOW, IMAGE_SERVER} from '../../constant/urls'

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isRefreshing: false,
            weather_now: {},

            // 所在城市
            city: '首尔',
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
        console.log(weather_icon);

        // <Image source={{ uri: weather_icon }} style={{ width: 100, height: 100 }} />
        return (
            <View style={styles.mainPage}>
                <StatusBar hidden={true}/>
                <View style={styles.cityName}>
                    <Text style={styles.cityNameText}>{this.state.city}</Text>
                </View>
                <View style={styles.aboutView}>
                    <View style={styles.aboutItemView}>
                        <Image source={require('../../images/weatherIcon/qlty.png')} style={styles.aboutItemImage}/>
                        <Text style={styles.aboutViewText}>{this.state.qlty}</Text>
                    </View>
                    <View style={styles.aboutItemView}>
                        <Image source={require('../../images/weatherIcon/wind_power.png')}
                               style={styles.aboutItemImage}/>
                        <Text style={styles.aboutViewText}>{this.state.wind_power} 级</Text>
                    </View>
                    <View style={styles.aboutItemView}>
                        <Image source={require('../../images/weatherIcon/feel_like.png')}
                               style={styles.aboutItemImage}/>
                        <Text style={styles.aboutViewText}>{this.state.feel_like}°</Text>
                    </View>
                    <View style={styles.aboutImageView}>
                        <Image source={{uri: weather_icon}} style={{width: 65, height: 65}}/>
                    </View>
                </View>
                <View style={styles.bigTemperatureView}>
                    <Text style={styles.bigTemperatureText}>{this.state.temperature}</Text>
                    <View style={styles.bigTemperatureSymbolView}>
                        <Text style={styles.bigTemperatureSymbol}>°</Text>
                    </View>
                </View>
                <View style={styles.detailView}>
                    <View style={styles.detailItemView}>
                        <Image source={require('../../images/weatherIcon/atmospheric_pressure.png')}
                               style={styles.detailItemImage}/>
                        <Text style={styles.detailItemText}>{this.state.atmospheric_pressure} kPa</Text>
                    </View>

                    <View style={{borderLeftWidth: 1, borderColor: 'black', width: 0, height: 70}}></View>

                    <View style={styles.detailItemView}>
                        <Image source={require('../../images/weatherIcon/humidity.png')}
                               style={styles.detailItemImage}/>
                        <Text style={styles.detailItemText}>{this.state.humidity} %</Text>
                    </View>

                    <View style={{borderLeftWidth: 1, borderColor: 'black', width: 0, height: 70}}></View>

                    <View style={styles.detailItemView}>
                        <Image source={require('../../images/weatherIcon/precipitation.png')}
                               style={styles.detailItemImage}/>
                        <Text style={styles.detailItemText}>{this.state.precipitation} mm</Text>
                    </View>

                    <View style={{borderLeftWidth: 1, borderColor: 'black', width: 0, height: 70}}></View>

                    <View style={styles.detailItemView}>
                        <Image source={require('../../images/weatherIcon/cloud.png')} style={styles.detailItemImage}/>
                        <Text style={styles.detailItemText}>{this.state.cloud} 成</Text>
                    </View>

                    <View style={{borderLeftWidth: 1, borderColor: 'black', width: 0, height: 70}}></View>

                    <View style={styles.detailItemView}>
                        <Image source={require('../../images/weatherIcon/visibility.png')}
                               style={styles.detailItemImage}/>
                        <Text style={styles.detailItemText}>{this.state.visibility} km</Text>
                    </View>
                </View>


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

const styles = StyleSheet.create({
    mainPage: {
        flex: 1,
        backgroundColor: '#fffff0',
    },
    cityName: {
        height: 70,
        justifyContent: 'flex-end',
        alignContent: 'center',
        alignItems: 'center',
    },
    cityNameText: {
        fontSize: 45,
        letterSpacing: 20,
        paddingLeft: 20,
        fontWeight: '900',
    },
    aboutView: {
        height: 80,
        flexDirection: 'row',
    },
    aboutItemView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'flex-end',
    },
    aboutItemImage: {
        width: 20,
        height: 20,
    },
    aboutViewText: {
        fontSize: 18,
        paddingLeft: 5,
    },
    aboutImageView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignContent: 'center',
        alignItems: 'center',
    },
    bigTemperatureView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    bigTemperatureText: {
        fontSize: 260,
        fontWeight: '900',
        letterSpacing: 0
    },
    bigTemperatureSymbolView: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 80,
    },
    bigTemperatureSymbol: {
        fontSize: 100,
        fontWeight: '500',
        padding: 0,
        margin: 0,
        letterSpacing: 0,
    },
    detailView: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    detailItemView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    detailItemImage: {
        width: 30,
        height: 30,
    },
    detailItemText: {
        fontSize: 12,
        fontWeight: '500',
        paddingTop: 10,
    }


})

export default Main;