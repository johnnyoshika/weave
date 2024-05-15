/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import computeScrollIntoView from 'compute-scroll-into-view';
import React, {useMemo, useState, useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import * as S from './WBMenu.styles';

export type WBMenuOption = {
  name?: string;
  value: string | number;
  icon?: string | null;
  disabled?: boolean;
  'data-test'?: string;
  render?(props: {hovered: boolean; selected: boolean}): React.ReactNode;
  onSelect?(): void;
};

export function getOptionDisplayName(option: WBMenuOption) {
  return option.name ?? option.value;
}

const scrollIntoView: typeof computeScrollIntoView = (target, options) => {
  const actions = computeScrollIntoView(target, options);
  actions.forEach(({el, top, left}) => {
    if (el !== document.documentElement) {
      el.scrollTop = top;
      el.scrollLeft = left;
    }
  });
  return actions;
};

const DEFAULT_OPTION_RENDERER: OptionRenderer = ({
  option,
  hovered,
  selected,
  fontSize,
  lineHeight,
}) => (
  <S.Item
    data-test={option['data-test']}
    hovered={hovered}
    fontSize={fontSize}
    lineHeight={lineHeight}>
    {getOptionDisplayName(option)}
    <S.ItemIcon
      name={
        option.icon ?? (selected && option.icon !== null ? 'check' : 'blank')
      }
    />
  </S.Item>
);

export type OptionRenderer = (props: {
  option: WBMenuOption;
  hovered: boolean;
  selected: boolean;
  fontSize?: number;
  lineHeight?: number;
}) => React.ReactNode;

export type WBMenuOnSelectHandler = (
  value: string | number,
  extra: {option: WBMenuOption}
) => void;

export type WBMenuTheme = 'dark' | 'light';

export interface WBMenuProps {
  className?: string;
  options: WBMenuOption[];
  optionRenderer?: OptionRenderer;
  // by default expands to fit longest item
  width?: number;
  selected?: string | number;
  selectedRef?: React.Ref<HTMLDivElement>;

  highlightFirst?: boolean;

  theme?: WBMenuTheme;
  backgroundColor?: string;
  fontSize?: number;
  lineHeight?: number;
  dataTest?: string;
  onSelect?: WBMenuOnSelectHandler;
  onEsc?(): void;
}

export const WBMenu = React.forwardRef<HTMLDivElement, WBMenuProps>(
  (
    {
      className,
      options,
      optionRenderer = DEFAULT_OPTION_RENDERER,
      width,
      selected,
      selectedRef,
      theme = 'dark',
      backgroundColor,
      fontSize,
      lineHeight,
      highlightFirst,
      onSelect,
      onEsc,
      dataTest,
    },
    ref
  ) => {
    const [defaultHighlighted, defaultHighlightedIndex] = useMemo(() => {
      if (!highlightFirst) return [undefined, undefined];
      const foundIndex = options.findIndex(el => !el.disabled);

      if (!foundIndex) return [undefined, undefined];

      return [options[foundIndex]?.value, foundIndex];
    }, [highlightFirst, options]);

    const [highlighted, setHighlighted] = useState<string | number | undefined>(
      defaultHighlighted
    );
    const [highlightedIndex, setHighlightedIndex] = useState<
      number | undefined
    >(defaultHighlightedIndex);

    const contentRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
      function onKeyDown(e: KeyboardEvent) {
        if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
          e.preventDefault();
          if (!options || !options.length) return;

          const block = e.key === 'ArrowUp' ? 'start' : 'end';
          const moveAmount = e.key === 'ArrowUp' ? -1 : 1;

          let newHighlightedIndex;
          if (typeof highlightedIndex === 'undefined') {
            newHighlightedIndex = options.findIndex(el => !el.disabled);
          } else {
            newHighlightedIndex = highlightedIndex + moveAmount;
            if (newHighlightedIndex >= options.length) {
              newHighlightedIndex = options.findIndex(el => !el.disabled);
            } else if (newHighlightedIndex < 0) {
              newHighlightedIndex = options.findLastIndex(el => !el.disabled);
            }
          }
          if (typeof newHighlightedIndex === 'number') {
            setHighlighted(options[newHighlightedIndex].value);
            setHighlightedIndex(newHighlightedIndex);

            const child = contentRef.current?.children[newHighlightedIndex];
            if (child) {
              scrollIntoView(child, {
                scrollMode: 'if-needed',
                block,
              });
            }
          }
        } else if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (highlightedIndex != null) {
            onSelect?.(options[highlightedIndex].value, {
              option: options[highlightedIndex],
            });
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          onEsc?.();
        }
      }
      document.addEventListener('keydown', onKeyDown);
      return () => {
        document.removeEventListener('keydown', onKeyDown);
      };
    }, [highlightedIndex, onEsc, onSelect, options]);

    const contentCallbackRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(node);
          } else {
            (ref as any).current = node;
          }
        }
        (contentRef as any).current = node;
      },
      [ref]
    );

    const themeObj = useMemo(() => ({main: theme}), [theme]);

    return (
      <ThemeProvider theme={themeObj}>
        <S.Content
          ref={contentCallbackRef}
          className={className}
          width={width}
          backgroundColor={backgroundColor}
          dataTest={dataTest}>
          {options.map(option => {
            const isSelected = selected === option.value;
            const isHovered = highlighted === option.value;
            return (
              <div
                key={option.value}
                data-test="wb-menu-item"
                ref={isSelected ? selectedRef : undefined}
                onMouseEnter={() => {
                  setHighlighted(option.value);
                }}
                style={option.disabled ? {pointerEvents: 'none'} : undefined}
                onMouseDown={e => {
                  e.preventDefault();
                }}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  option.onSelect?.();
                  onSelect?.(option.value, {option});
                }}>
                {option.render
                  ? option.render({
                      hovered: isHovered,
                      selected: isSelected,
                    })
                  : optionRenderer({
                      option,
                      hovered: isHovered,
                      selected: isSelected,
                      fontSize,
                      lineHeight,
                    })}
              </div>
            );
          })}
        </S.Content>
      </ThemeProvider>
    );
  }
);
