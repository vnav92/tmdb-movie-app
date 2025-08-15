import { TbMovie } from 'react-icons/tb';
import { FaSearch } from 'react-icons/fa';
import { useIntl } from 'react-intl';

import styles from './page-header.module.scss';
import { Form } from 'react-bootstrap';
import { TextInput } from '../text-input';


type PageHeaderProps =
  | { hasInput?: never }
  | {
      hasInput: true;
      inputValue: string;
      onInputValueChange: (value: string) => void;
    };

export const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { formatMessage } = useIntl();

  return (
    <div className={styles.pageHeaderWrapper}>
      <h1 className={styles.pageHeaderAppName}>
        <TbMovie aria-hidden={true} />
        {formatMessage({ id: 'global.appName' })}
      </h1>
      {props.hasInput && (
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <TextInput
              ariaLabel={formatMessage({ id: 'textInput.ariaLabel' })}
              name="movie-search"
              placeholder={formatMessage({ id: 'textInput.placeholder' })}
              addonBefore={<FaSearch className={styles.textInputAddod} />}
              onChange={props.onInputValueChange!}
              value={props.inputValue}
            />
          </Form.Group>
        </Form>
      )}
    </div>
  );
};
