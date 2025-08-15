import { Form, InputGroup } from 'react-bootstrap';

import styles from './text-input.module.scss';

type TextInputProps = {
  addonBefore?: React.ReactNode;
  placeholder: string;
  ariaLabel: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
};

export const TextInput: React.FC<TextInputProps> = ({
  addonBefore,
  placeholder,
  ariaLabel,
  name,
  value,
  onChange,
}) => {
  return (
    <InputGroup className={styles.textInputWrapper}>
      {addonBefore && <InputGroup.Text>{addonBefore}</InputGroup.Text>}
      <Form.Control
        className={styles.textInput}
        aria-label={ariaLabel}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </InputGroup>
  );
};
