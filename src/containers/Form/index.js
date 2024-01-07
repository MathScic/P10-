import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); }) 

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);

      try {
        // On fait l'appel API 
        await mockContactApi();

        // Si c est bon, on appelle onSuccess 
        if (onSuccess) {
          onSuccess();
        }

      } catch (err) {
        // Si ereur, appelle on Error 
        if (onError) {
          onError(err);
        }

      } finally {
        // Re initialise l'état a zéro apres clique sur envoyer 
        setSending(false);
        setNom('');
        setPrenom('');
        setEmail('');
        setMessage('');
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
          <Field placeholder="" label="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
