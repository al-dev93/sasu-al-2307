export type InputData = {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'tel';
  placeholder: string;
  pattern?: string;
  required?: boolean;
};

type FormData = InputData[];

const formData: FormData = [
  {
    label: 'Nom',
    id: 'name',
    type: 'text',
    placeholder: 'prénom - nom',
    required: true,
  },
  {
    label: 'Entreprise',
    id: 'company',
    type: 'text',
    placeholder: "nom de l'entreprise",
  },
  {
    label: 'Email',
    id: 'email',
    type: 'email',
    placeholder: 'adresse mail valide',
    required: true,
  },
  {
    label: 'Téléphone',
    id: 'tel',
    type: 'tel',
    placeholder: '0X xx xx xx xx',
    pattern: '0[0-9] [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}',
  },
  {
    label: 'Message',
    id: 'message',
    placeholder: 'votre message',
    required: true,
  },
];

export default formData;
