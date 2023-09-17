import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import SectionTitle from './components/SectionTitle';
import SkillsList from './components/SkillsList';
import skillsData from './utils/skillsData';
import Slideshow from './components/Slideshow';
import Card from './components/Card';
import { cardsList } from './utils/worksList';
import Button from './components/Button';
import FormDialog from './components/FormDialog';
import formData from './utils/modalFormData';

function App() {
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);

  /**
   * @description
   * @returns void
   */
  const handleClick = (): void => setOpenFormDialog(true);

  return (
    <div className='App'>
      <FormDialog
        open={openFormDialog}
        setOpen={setOpenFormDialog}
        formData={formData}
        idForm='contact'
        submitButtonName='Envoyer'
        title='Prenez Contact !'
        subTitle='une demande, un projet...'
        alertOnSubmit={['Votre message a été envoyé', 'Il sera traité dans les plus brefs délais']}
      />
      <main>
        <section className='hero-section'>
          <div className='body-section'>
            <p className='welcome'>Bienvenue sur le site de</p>
            <h1>Sasu</h1>
            <p className='slogan'>Créer des applications web réactives</p>
            <p className='description'>
              Sasu développe et conçoit des applications web performantes et esthétiques. Elle
              s&apos;attache à respecter votre volonté de proposer des interfaces centrées sur
              l&apos;humain, adaptées aux formats actuels d&apos;écrans et satisfaisant les critères
              d’accessibilité.
            </p>
          </div>
          <Button name='Contact' onClick={handleClick} />
        </section>

        {/* skills section */}
        <section className='app-section'>
          <div className='body-section'>
            <SectionTitle title='Compétences' />

            <p className='description'>
              Développeur concepteur de logiciel, j’ai choisi de déployer mon activité en l’adossant
              à une société unipersonnelle: Sasu.
            </p>
            <p className='description'>
              Spécialisée dans le développement Front-end, Sasu peut intégrer une maquette existante
              ou la créer en élaborant le design avec vous.
              <br />
              <b>
                Sasu veut répondre à votre attente d&apos;interface utilisateur esthétique,
                responsive et accessible.
              </b>
            </p>
            <p className='description'>
              Sasu peut également vous aider à mettre en oeuvre ou à améliorer votre projet. Elle
              proposera ainsi de déboguer un code défectueux, de refactoriser une base de code pour
              l&apos;optimiser, de créer des tests pour accroître la fiabilité, ou encore de
              convertir une application avec des technologies récentes.
              <br />
              <b>Sasu veut oeuvrer à la performance de votre projet.</b>
            </p>
            <p className='description'>
              HTML et CSS sont au coeur des technologies maîtrisées par Sasu. Elles sont complétées
              par la liste ci-dessous. Enfin, pour une application nécessitant un Back-end modeste,
              Sasu peut en assurer la création.
              <br />
              <b>
                Sasu s&apos;appuie sur un large éventail de technologie pour proposer des
                applications dynamiques et réactives
              </b>
            </p>

            <SkillsList list={[...skillsData.script, ...skillsData.style]} type='table' />
          </div>
          <Button name='Contact' onClick={handleClick} />
        </section>

        {/* key projects section */}
        <section className='app-section'>
          <div className='body-section'>
            <SectionTitle title='Principales réalisations' />
            <Slideshow />
          </div>
          <Button name='Contact' onClick={handleClick} />
        </section>

        {/* other projects section */}
        <section className='app-section'>
          <div className='body-section'>
            <SectionTitle title='Autres réalisations' />
            <div className='cards-wrapper'>
              {cardsList.map((value, index) => (
                <Card
                  key={`${index + 1}`}
                  title={value.title}
                  description={value.description}
                  list={value.skills}
                />
              ))}
            </div>
          </div>
          <Button name='Contact' onClick={handleClick} />
        </section>
      </main>
    </div>
  );
}

export default App;
