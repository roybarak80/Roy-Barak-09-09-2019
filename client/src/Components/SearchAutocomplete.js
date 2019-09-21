import React from 'react';
import { connect } from 'react-redux';
import { searchCityAutoComplete, onSelectCity } from '../actions/sitesActions';
import Autocomplete from 'react-md/lib/Autocompletes';

const SearchAutocomplete = ({
    searchResults,
    onSelectCity,
    searchCityAutoComplete }) => {

    return (

        <div className="form-group position-relative">
            {searchResults ?
                < Autocomplete
                    id="test-autocomplete"
                    label="Search City Forecast"
                    dataLabel="localizedname"
                    autocompleteWithLabel
                    placeholder="Type City Name"
                    data={searchResults}
                    onChange={(textFeldValue, event) => {
                        searchCityAutoComplete(textFeldValue);
                    }}

                    onAutocomplete={(textFeldValue, event) => {
                        onSelectCity(textFeldValue);
                    }}

                    simplifiedMenu={false}
                    anchor={{
                        x: Autocomplete.HorizontalAnchors.CENTER,
                        y: Autocomplete.VerticalAnchors.BOTTOM
                    }}
                    position={Autocomplete.Positions.BOTTOM}
                />
                : null}

        </div>
    )
};

const mapStateToProps = state => {
    console.log(state)
    return {
        selectedCity: state.sitesReducer.selectedCity,
        searchResults: state.sitesReducer.searchResults,
    }
}

const mapDispatchToProps = dispatch => ({
    searchCityAutoComplete: (value) => { dispatch(searchCityAutoComplete(value)) },
    onSelectCity: (textFeldValue) => { dispatch(onSelectCity(textFeldValue)) },
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchAutocomplete);
