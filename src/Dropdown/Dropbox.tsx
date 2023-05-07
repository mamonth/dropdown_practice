import {createPortal} from 'react-dom';
import React, {MutableRefObject, useEffect, useLayoutEffect, useRef, useState} from 'react';

interface DropboxProps {
  children?: React.ReactNode;
  show?: boolean;
  triggerElRef: MutableRefObject<HTMLElement | undefined>;
  onClose?: () => void;
}

interface BoxPosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

let onDropboxShow;

const getBoxPosition = (ancorEl?: HTMLElement, boxHeight = 200, boxWidth = 260): BoxPosition => {
  const posStyle: BoxPosition = {};

  if (!ancorEl) return posStyle;

  const ancorRect = ancorEl.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();

  if ((ancorRect.top - boxHeight) > bodyRect.top) {
    posStyle.bottom = bodyRect.bottom - ancorRect.top;
  } else {
    posStyle.top = ancorRect.bottom;
  }

  if ((ancorRect.right + boxWidth) > bodyRect.right ) {
    posStyle.right = bodyRect.right - ancorRect.right;
  } else {
    posStyle.left = ancorRect.left;
  }

  return posStyle;
}

const Dropbox = ({children, triggerElRef, onClose}: DropboxProps) => {
  const callbackRef = useRef<CallableFunction>();
  const observerRef = useRef<IntersectionObserver>();
  const [hidden, setHidden] = useState<boolean>(false);

  const onViewportIntersect = (entries) => {
    const {isIntersecting} = entries[0];

    // ease position calculation when reappear
    setTimeout(() => setHidden(!isIntersecting), 50);
  }

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(onViewportIntersect)
    }

    triggerElRef.current && observerRef.current?.observe(triggerElRef.current);

    return () => {
      observerRef.current?.disconnect();
    }
  })

  useLayoutEffect(() => {
    if (onDropboxShow) {
      onDropboxShow();
    }

    onDropboxShow = () => onClose?.();
    callbackRef.current = onDropboxShow;

    return () => {
      if (callbackRef.current === onDropboxShow) {
        onDropboxShow = undefined
      }
    }
  }, [])

  return !hidden && createPortal((
    <div
      className="dropdown__dropbox"
      style={{
        ...getBoxPosition(triggerElRef?.current),
      }}
    >
      {children}
    </div>
  ), document.body);
}

export {Dropbox};
