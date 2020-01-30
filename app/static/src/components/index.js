// Rollspecific Goals
import RollspecificGoals from './RollspecificGoals/RollspecificGoals';

import Planer from './RollspecificGoals/Planer/Planer';
import EnergyProvider from './RollspecificGoals/EnergyProvider/EnergyProvider';
import Industry from './RollspecificGoals/Industry/Industry';

// Generic
import GenericValue from './Generic/GenericValue/GenericValue';
import GenericRolls from './Generic/GenericRolls/GenericRolls';
import GenericTimeseries from './Generic/GenericTimeseries/GenericTimeseries';

// Carbon Budget
import CarbonBudget from './CarbonBudget/CarbonBudget';

// Available Components and their name so they can be rendered based on the configuration
const ComponentDict = {
    GENERIC_VALUE: 'GenericValue',
    ROLLSPECIFIC_GOALS: 'RollspecificGoals',
    CARBON_BUDGET: 'CarbonBudget',
    GENERIC_ROLLS: 'GenericRolls',
    GENERIC_TIMESERIES: 'GenericTimeseries'
};

export default {
    // Rollspecific
    RollspecificGoals,

    Planer,
    EnergyProvider,
    Industry,

    // Generic
    GenericValue,
    GenericRolls,
    GenericTimeseries,

    // Carbon Budget
    CarbonBudget,
    _componentDict: ComponentDict
};
