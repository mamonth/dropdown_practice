import './index.pcss'

import React, {useEffect, useRef, useState} from 'react';
import {Dropbox} from './Dropbox';

type DropdownItem = string | React.ReactNode;

interface DropdownProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  items: Array<DropdownItem>;
  onItemClick?: (item: DropdownItem, itemKey: number, event: React.MouseEvent) => void;
}

const Dropdown = ({children, style, items, onItemClick}: DropdownProps) => {
  const [opened, setOpened] = useState<boolean>(false);
  const triggerElRef = useRef<HTMLElement>();
  const boxElRef = useRef<HTMLElement>();

  const toggleBox = (state?: boolean) => {
    setOpened(state === undefined ? !opened : state);
  }

  const onItemClickInternal = (item: DropdownItem, itemKey: number, evt: React.MouseEvent) => {
    onItemClick?.(item, itemKey, evt);

    toggleBox(false);
  }

  const onOuterClick = (evt) => {
    if (
      evt.button !== 2
      && triggerElRef.current && !triggerElRef.current?.contains(evt.target)
      && boxElRef.current && !boxElRef.current?.contains(evt.target)
    ) {
      toggleBox(false);
    }
  }

  useEffect(() => {
    const unsub = () => document.removeEventListener('mousedown', onOuterClick);

    if (opened) {
      document.addEventListener('mousedown', onOuterClick);
    } else {
      unsub();
    }

    return () => {
      unsub();
    }
  }, [opened])

  return (<div
    ref={triggerElRef}
    className="dropdown"
    style={style}
    onClick={(e) => {
      toggleBox()
    }}
  >
    {children}
    {opened && (<Dropbox
      triggerElRef={triggerElRef}
      onClose={() => toggleBox(false)}
    >
      <ul
        ref={boxElRef}
        className="dropdown__box"
      >
        {items.map((item, key) => (
          <li
            key={key} /* On purpose for this particular case - considering items list as "static" set */
            className="dropdown__box__item"
            onClick={(evt) => onItemClickInternal(item, key, evt)}
          >
            {item}
          </li>
        ))}
      </ul>
    </Dropbox>)}
  </div>)
}

export {Dropdown}
