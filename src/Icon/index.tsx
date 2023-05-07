import featherSprite from 'feather-icons/dist/feather-sprite.svg'

interface IconProps {
  name: string;
}

const Icon = ({name}: IconProps) => {
  return (<svg style={{
    width: '24px',
    height: '24px',
    stroke: 'currentColor',
    fill: 'none',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }}>
    <use href={featherSprite + '#' + name}/>
  </svg>)
}

export {Icon}
