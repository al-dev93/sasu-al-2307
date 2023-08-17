type FormData = {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'tel';
  placeholder: string;
  pattern?: string;
  required?: 'required';
}[];

const formData: FormData = [
  {
    label: 'Nom',
    id: 'name',
    type: 'text',
    placeholder: 'prénom - nom',
    required: 'required',
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
    required: 'required',
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
    required: 'required',
  },
];

export default formData;
