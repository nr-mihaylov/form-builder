import CurrencyWidget  from './CurrencyWidget.js';
import BinaryWidget  from './BinaryWidget.js';
import LabelWidget  from './LabelWidget.js';
import DividerWidget  from './DividerWidget.js';
import DateWidget  from './DateWidget.js';
import RadioGroupWidget  from './RadioGroupWidget.js';
import FormulaWidget  from './FormulaWidget.js';

var widgetTemplates = [
    {
        type: 'CURRENCY_WIDGET',
        template: CurrencyWidget
    },
    {
        type: 'BINARY_WIDGET',
        template: BinaryWidget
    },
    {
        type: 'LABEL_WIDGET',
        template: LabelWidget
    },
    {
        type: 'DIVIDER_WIDGET',
        template: DividerWidget
    },
    {
        type: 'DATE_WIDGET',
        template: DateWidget
    },
    {
        type: 'RADIO_GROUP_WIDGET',
        template: RadioGroupWidget
    },
    {
        type: 'FORMULA_WIDGET',
        template: FormulaWidget
    }
];

export default (type) => widgetTemplates.find((template) => {return template.type === type}).template;
