import './App.css'
import {Dropdown} from './Dropdown';
import {Icon} from './Icon';
import {useState} from 'react';

const dropdownItems = [
  'Первый элемент дропдауна с длинным текстом',
  (<span>Реакт элемент</span>),
  (<div>
    <span>Элемент с иконкой</span>
    <Icon name="delete"/>
  </div>),
];

function App() {
  const [withScroll, setWithScroll] = useState<boolean>(false);

  return (
    <div
      className="app"
      style={{
        height: withScroll ? '200%' : '100%',
      }}
    >
      <button
        className="button-toggler"
        onClick={() => setWithScroll(!withScroll)}
      >{withScroll ? 'Выключить' : 'Включить'} скролл</button>
      <Dropdown
        style={{position: 'absolute', top: 0, left: 0}}
        items={dropdownItems}
        onItemClick={(item, itemKey) => {
          console.log('Item clicked', item, itemKey);
        }}
      >
        <Icon name="circle"/>
      </Dropdown>
      <Dropdown
        style={{position: 'absolute', top: 0, right: 0}}
        items={dropdownItems}
      >
        <Icon name="align-justify"/>
      </Dropdown>
      <Dropdown
        style={{position: 'absolute', bottom: 0, left: 0}}
        items={dropdownItems}
      >
        <div style={{
          backgroundColor: 'lightblue',
          width: '24px',
          height: '24px',
        }}/>
      </Dropdown>
      <Dropdown
        style={{position: 'absolute', bottom: 0, right: 0}}
        items={dropdownItems}
      >
        <span>Click me!</span>
      </Dropdown>
    </div>
  )
}

export default App
