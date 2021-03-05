import { useTranslation } from 'react-i18next';
import { StyledLabel } from '../../styles/global-style';

const Label = (props: { label: string, propertyName: string, data: any}) => {

    const { t } = useTranslation();
    const { label, propertyName, data } = props;
    let value, viewValue;


    //Functions to process Output
    function getDescriptionFromOneOf(value: string, id: string, response: any): string {
        if (
          response._options &&
          response._options.properties &&
          response._options.properties[id] &&
          response._options.properties[id]['oneOf']
        ) {
          for (let i = 0; i < response._options.properties[id]['oneOf'].length; i++) {
            if (
              response._options.properties[id]['oneOf'][i]['enum'][0] ===
              value
            ) {
              value = response._options.properties[id]['oneOf'][i]['title'];
            }
          }
        }
        return value;
      }

    function processDataOutput() {
        if(data && data.hasOwnProperty(propertyName)) {
            value = data[propertyName];
            viewValue = getDescriptionFromOneOf(value, propertyName, data);
            return viewValue ? viewValue : value;
        }
    }

    return (
        <div className="row">
            <div className="col-12">
                { 
                    label && <StyledLabel>
                        {t(label)}:
                    </StyledLabel>
                }
                <label dangerouslySetInnerHTML={{ __html: processDataOutput() }}></label>
            </div>
        </div>
    )
}

export default Label;