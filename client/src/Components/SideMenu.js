import React from 'react';
import { toggleSideMenu, toggleThemeType, toggleWeatherUnits } from '../actions/sitesActions';

import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const SideMenu = ({
    isOpenSideMenu,
    onToggleSideMenu,
    isDarkTheme,
    onToggleThemeType,
    isMetricUnits,
    onToggleWeatherUnits }) => {

    const sidemenuThemeClass = isDarkTheme ? 'dark-theme' : 'light-theme';
    const sidemenuActive = !isOpenSideMenu ? 'side-menu' : 'side-menu active'
    return (

        <div >
            <span onClick={() => { onToggleSideMenu(isOpenSideMenu) }}
                className={`toggle-sidebar  ${sidemenuThemeClass}`} > <i className="fa fa-cog"></i></span>
            <div className={`${sidemenuActive} ${sidemenuThemeClass}`}>

                <div className="buttons-wrapper">
                    <FormControlLabel
                        control={<Switch checked={isDarkTheme}
                            onChange={() => onToggleThemeType(isDarkTheme)}
                            color="primary" />}
                        label="Dark/Light Theme"
                    />
                    <FormControlLabel
                        onChange={() => onToggleWeatherUnits(isMetricUnits)}
                        control={<Switch color="primary" />}
                        label="Celsius/Fahrenheit"
                    />
                </div>


            </div>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        isOpenSideMenu: state.sitesReducer.isOpenSideMenu,
        isDarkTheme: state.sitesReducer.isDarkTheme,
        isMetricUnits: state.sitesReducer.isMetricUnits,
    }
}

const mapDispatchToProps = dispatch => ({
    onToggleWeatherUnits: (value) => { dispatch(toggleWeatherUnits(value)) },
    onToggleSideMenu: (value) => { dispatch(toggleSideMenu(value)) },
    onToggleThemeType: (value) => { dispatch(toggleThemeType(value)) },

})

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);

