 // Map the Redux state to component props
 export const mapState = (state) => ({
    lfa_severe: state.stats.lfa_severe,
    lfa_stunted: state.stats.lfa_stunted,
    lfa_normal: state.stats.lfa_normal,
    lfa_tall : state.stats.lfa_tall,

    wfa_severe :  state.stats.wfa_severe,
    wfa_underweight : state.stats.wfa_underweight,
    wfa_normal :  state.stats.wfa_normal,
    wfa_overweight : state.stats.wfa_overweight,

    population : state.stats.population,
    closed : closed,
  });

