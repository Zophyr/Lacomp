import React from 'react';
import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {API_AIR_NOW, API_WEATHER_NOW, IMAGE_SERVER} from '../../constant/urls';

import Picker from 'react-native-picker';
import area from '../../constant/area';

import CitySelect from 'react-native-city-select'
import CITY from '../../constant/cityData'

class Main extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: true,
            isRefreshing: false,
            cityStatus: false,
            cityId: '',

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

    _createAreaData() {
        let data = [];
        let len = area.length;
        for (let i = 0; i < len; i++) {
            let city = [];
            for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
                city.push(area[i]['city'][j]['name']);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }

        return data;
    }

    _showAreaPicker() {
        Picker.init({
            pickerConfirmBtnText: 'OK',
            pickerConfirmBtnColor: [1, 1, 1, 1],
            pickerCancelBtnText: 'Cancel',
            pickerCancelBtnColor: [1, 1, 1, 1],
            pickerTitleColor: [1, 1, 1, 1],
            pickerToolBarBg: [255, 248, 220, 1],
            pickerBg: [255, 248, 220, 1],
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerTitleText: 'Select City',

            pickerData: this._createAreaData(),
            selectedValue: ['广东', '广州'],
            onPickerConfirm: pickedValue => {
                this.setState({
                    city: pickedValue[1],
                });
                this.setupData(pickedValue[1]);
            },
        });
        Picker.show();
    }

    handleCityPress = () => {
        this.setState({
            cityStatus: true,
        })
    }

    handleCitySelect = (cityObj) => {
        this.setState({
            cityStatus: false,
            city: cityObj.cityName,
            cityId: cityObj.cityId,
        })
        this.setupData(cityObj.cityName);
    }

    handleCityCancel = () => {
        this.setState({
            cityStatus: false,
        })
    }

    renderCitySelect() {
        if (this.state.cityStatus) {
            return (
                <CitySelect
                    cancelCity={this.handleCityCancel}
                    selectCity={this.handleCitySelect}
                    cityData={CITY}
                    selectedId={this.state.cityId}
                />
            )
        }
    }

    render() {
        let weather_icon = IMAGE_SERVER + this.state.weather_code + '.png';

        return (
            <View style={styles.mainPage}>
                <StatusBar hidden={true}/>
                {this.renderCityName()}
                {this.renderAboutView(weather_icon)}
                {this.renderBigTemperature()}
                {this.renderDetailView()}
                {this.renderCitySelect()}
            </View>
        );

    }

    componentDidMount() {
        this.setupData(this.state.city);
    }

    renderCityName() {
        return (
            <TouchableOpacity style={styles.cityName} onPress={this._showAreaPicker.bind(this)}>
                <Text style={styles.cityNameText}>{this.state.city}</Text>
            </TouchableOpacity>
        );
    }

    renderAboutView(weather_icon) {
        return (
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
        );

    }

    renderBigTemperature() {
        if (this.state.temperature <= -10) {
            return (
                <View style={styles.bigTemperatureView}>
                    <Text style={styles.bigTemperatureTextSmall}>{this.state.temperature}</Text>
                    <View style={styles.bigTemperatureSymbolView}>
                        <Text style={styles.bigTemperatureSymbol}>°</Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.bigTemperatureView}>
                <Text style={styles.bigTemperatureText}>{this.state.temperature}</Text>
                <View style={styles.bigTemperatureSymbolView}>
                    <Text style={styles.bigTemperatureSymbol}>°</Text>
                </View>
            </View>
        );
    }

    renderDetailView() {
        return (
            <View style={styles.detailView}>
                <View style={styles.detailItemView}>
                    <Image source={require('../../images/weatherIcon/atmospheric_pressure.png')}
                           style={styles.detailItemImage}/>
                    <Text style={styles.detailItemText}>{this.state.atmospheric_pressure} kPa</Text>
                </View>

                <View style={styles.cutOffLine}></View>

                <View style={styles.detailItemView}>
                    <Image source={require('../../images/weatherIcon/humidity.png')}
                           style={styles.detailItemImage}/>
                    <Text style={styles.detailItemText}>{this.state.humidity} %</Text>
                </View>

                <View style={styles.cutOffLine}></View>

                <View style={styles.detailItemView}>
                    <Image source={require('../../images/weatherIcon/precipitation.png')}
                           style={styles.detailItemImage}/>
                    <Text style={styles.detailItemText}>{this.state.precipitation} mm</Text>
                </View>

                <View style={styles.cutOffLine}></View>

                <View style={styles.detailItemView}>
                    <Image source={require('../../images/weatherIcon/cloud.png')} style={styles.detailItemImage}/>
                    <Text style={styles.detailItemText}>{this.state.cloud} 成</Text>
                </View>

                <View style={styles.cutOffLine}></View>

                <View style={styles.detailItemView}>
                    <Image source={require('../../images/weatherIcon/visibility.png')}
                           style={styles.detailItemImage}/>
                    <Text style={styles.detailItemText}>{this.state.visibility} km</Text>
                </View>
            </View>
        );
    }


    setupData(cityName) {
        let apiOfWeatherNow = API_WEATHER_NOW + cityName;

        fetch(apiOfWeatherNow)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.HeWeather6[0].status === 'unknown city') {
                    this.setState({
                        city: '∞',
                        weather_now: '∞',
                        temperature: '∞',
                        feel_like: '∞',
                        weather_text: '∞',
                        weather_code: '∞',
                        wind_direction: '∞',
                        wind_power: '∞',
                        wind_speed: '∞',
                        humidity: '∞',
                        precipitation: '∞',
                        atmospheric_pressure: '∞',
                        visibility: '∞',
                        cloud: '∞'
                    })
                }
                else if (responseJson.HeWeather6[0].status === 'no data for this location') {
                    this.setState({
                        city: '∞',
                        weather_now: '∞',
                        temperature: '∞',
                        feel_like: '∞',
                        weather_text: '∞',
                        weather_code: '∞',
                        wind_direction: '∞',
                        wind_power: '∞',
                        wind_speed: '∞',
                        humidity: '∞',
                        precipitation: '∞',
                        atmospheric_pressure: '∞',
                        visibility: '∞',
                        cloud: '∞'
                    })
                }
                else {
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
                }
            })
            .catch((error) => {
                console.error(error);
            });

        let apiOfAirNow = API_AIR_NOW + cityName;
        fetch(apiOfAirNow)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.HeWeather6[0].status === 'no data for this location') {
                    this.setState({
                        aqi: '∞',
                        qlty: '∞',
                    })
                }
                else if (responseJson.HeWeather6[0].status === 'unknown city') {
                    this.setState({
                        aqi: '∞',
                        qlty: '∞',
                    })
                }
                else {
                    this.setState({
                        // 空气质量指数
                        aqi: responseJson.HeWeather6[0].air_now_city.aqi,

                        // 空气质量
                        qlty: responseJson.HeWeather6[0].air_now_city.qlty,
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
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
        fontSize: 16,
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
    bigTemperatureTextSmall: {
        fontSize: 200,
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
    },
    cutOffLine: {
        borderLeftWidth: 1,
        borderColor: 'black',
        width: 0,
        height: 70
    }


})

export default Main;