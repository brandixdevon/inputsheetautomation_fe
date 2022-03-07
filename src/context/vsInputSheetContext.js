import React from 'react'

export default React.createContext({
    divisions:[{name:"VS Sleep",id:1},{name:"VS Modern",id:2},],
    project:[{name:"VS Sleep",id:1},{name:"VS Modern",id:2}],
    selectedDivision:2,
    merchandisers:[],
    planners:[],
    buyerDivisions:[],
    buyerDivisionspink:[],
    leadFactories:[],
    garmentCompositions:[],
    warehouses:[],
    m3buyerDivisions:[],
    changeSelectedDivision:(divisionId)=>{},
});