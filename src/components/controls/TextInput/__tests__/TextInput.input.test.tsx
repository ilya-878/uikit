import React from 'react';

import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {TextInput} from '../TextInput';

describe('TextInput input', () => {
    describe('without label prop', () => {
        describe('basic', () => {
            test('render input by default', () => {
                render(<TextInput />);
                const input = screen.getByRole('textbox');

                expect(input).toBeVisible();
                expect(input.tagName.toLowerCase()).toBe('input');
            });

            test('check clear button visibility with hasClear prop', async () => {
                render(<TextInput hasClear />);
                const user = userEvent.setup();
                const input = screen.getByRole('textbox');
                let clearButton = screen.queryByRole('button', {name: 'Clear input value'});
                expect(clearButton).not.toBeInTheDocument();
                await user.type(input, 'abc');
                clearButton = screen.queryByRole('button', {name: 'Clear input value'});
                expect(clearButton).toBeInTheDocument();
            });

            test('do not render clear button without hasClear prop', () => {
                render(<TextInput />);

                expect(
                    screen.queryByRole('button', {name: 'Clear input value'}),
                ).not.toBeInTheDocument();
            });

            test('call onChange when input changes value', () => {
                const onChangeFn = jest.fn();

                render(<TextInput onChange={onChangeFn} />);
                fireEvent.change(screen.getByRole('textbox'), {target: {value: '1'}});

                expect(onChangeFn).toBeCalled();
            });

            test('call onUpdate with certain value when input changes value', () => {
                const onUpdateFn = jest.fn();
                const value = 'some';

                render(<TextInput onUpdate={onUpdateFn} />);
                fireEvent.change(screen.getByRole('textbox'), {target: {value}});

                expect(onUpdateFn).toBeCalledWith(value);
            });

            test('call onChange when click to clean button', async () => {
                const onChangeFn = jest.fn();
                const user = userEvent.setup();
                render(<TextInput hasClear onChange={onChangeFn} />);
                const input = screen.getByRole('textbox');
                await user.type(input, 'abc');
                const clear = screen.getByRole('button', {name: 'Clear input value'});

                if (clear) {
                    await user.click(clear);
                }

                expect(onChangeFn).toBeCalled();
            });
        });

        describe('error', () => {
            test('render error message with error prop', () => {
                const {container} = render(<TextInput error="Some Error" />);

                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                expect(container.querySelector('.yc-text-input__error')).toBeInTheDocument();
                expect(screen.getByText('Some Error')).toBeVisible();
            });

            test('render error message with errorMessage prop', () => {
                const {container} = render(
                    <TextInput errorMessage="Some Error with errorMessage prop" />,
                );

                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                expect(container.querySelector('.yc-text-input__error')).toBeInTheDocument();
                expect(screen.getByText('Some Error with errorMessage prop')).toBeVisible();
            });

            test('render error icon if tooltip option is selected for errorPlacement prop', () => {
                const {container} = render(
                    <TextInput errorMessage="Some Error" errorPlacement="tooltip" />,
                );

                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                expect(container.querySelector('.yc-text-input__error-icon')).toBeInTheDocument();
            });

            test('do not show error without error/errorMessage prop', () => {
                const {container} = render(<TextInput />);

                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                expect(container.querySelector('.yc-text-input__error')).not.toBeInTheDocument();
            });

            test('do not show error message if error prop value is an empty string', () => {
                const {container} = render(<TextInput error={''} />);

                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                expect(container.querySelector('.yc-text-input__error')).not.toBeInTheDocument();
            });

            test('do not show error message if errorMessage prop value is an empty string', () => {
                const {container} = render(<TextInput errorMessage={''} />);

                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                expect(container.querySelector('.yc-text-input__error')).not.toBeInTheDocument();
            });

            test('do not show error icon if error prop is an empty string', () => {
                const {container} = render(<TextInput error={''} errorPlacement="tooltip" />);

                expect(
                    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                    container.querySelector('yc-text-input__error-icon'),
                ).not.toBeInTheDocument();
            });

            test('do not show error icon if errorMessage prop is an empty string', () => {
                const {container} = render(
                    <TextInput errorMessage={''} errorPlacement="tooltip" />,
                );

                expect(
                    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                    container.querySelector('yc-text-input__error-icon'),
                ).not.toBeInTheDocument();
            });

            test('visually, input should be in error state (red border) if error prop is received', () => {
                const {container} = render(<TextInput error={'Some error'} />);

                expect(
                    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                    container.querySelector('.yc-text-input_state_error'),
                ).toBeInTheDocument();
            });

            test('visually, input should be in error state (red border) even if received error prop is an empty string', () => {
                const {container} = render(<TextInput error={''} />);

                expect(
                    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                    container.querySelector('.yc-text-input_state_error'),
                ).toBeInTheDocument();
            });
        });

        describe('autocomplete', () => {
            test('render no autocomplete attribute when no autoComplete, no id, no name props', () => {
                render(<TextInput />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBeNull();
            });

            test('render autocomplete=on attribute with autoComplete prop', () => {
                render(<TextInput autoComplete />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBe('on');
            });

            test('render autocomplete=off attribute with autoComplete=false prop', () => {
                render(<TextInput autoComplete={false} />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBe('off');
            });
        });
    });

    describe('with label prop', () => {
        describe('basic', () => {
            test('render input with label', () => {
                const {container} = render(<TextInput label="Label:" />);

                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                const label = container.querySelector('.yc-text-input__label');

                expect(label).toBeInTheDocument();
                expect(label?.tagName.toLowerCase()).toBe('label');
                expect(screen.getByText('Label:')).toBeVisible();
            });
        });

        describe('autocomplete', () => {
            test('render autocomplete=off attribute when no autoComplete, no id, no name props', () => {
                render(<TextInput label="Label:" />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBe('off');
            });

            test('render no autocomplete attribute when no autoComplete prop, but id prop set', () => {
                render(<TextInput id="yc-id" label="Label:" />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBeNull();
            });

            test('render no autocomplete attribute when no autoComplete prop, but name prop set', () => {
                render(<TextInput name="yc-name" label="Label:" />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBeNull();
            });

            test('render autocomplete=on attribute when autoComplete prop "on"', () => {
                render(<TextInput autoComplete="on" label="Label:" />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBe('on');
            });

            test('render autocomplete=off attribute when autoComplete prop "off"', () => {
                render(<TextInput autoComplete="off" label="Label:" />);
                const input = screen.getByRole('textbox');

                expect(input.getAttribute('autocomplete')).toBe('off');
            });
        });
    });
});
