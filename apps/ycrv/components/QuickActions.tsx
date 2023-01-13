import React from 'react';
import {Button} from '@yearn-finance/web-lib/components/Button';
import {Dropdown} from '@common/components/TokenDropdown';
import IconArrowRight from '@common/icons/IconArrowRight';

import type {ChangeEvent, ReactElement, ReactNode} from 'react';
import type {TBalanceData} from '@yearn-finance/web-lib/hooks/types';
import type {TDict} from '@yearn-finance/web-lib/utils/types';
import type {TDropdownOption} from '@common/types/types';

type TSelect = {
	label: string;
	legend: string;
	options: TDropdownOption[];
	selected?: TDropdownOption;
	balanceSource?: TDict<TBalanceData>; // only 'from'
	onSelect: (option: TDropdownOption) => void;
}

type TSwitch = {
	tooltipText: string;
	onSwitchFromTo: () => void;
}

type TInput = {
	label: string;
	legend: string;
	value: string | number;
	isDisabled: boolean;
	onSetMaxAmount?: () => void;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Select(props: TSelect): ReactElement {
	const {label, legend, options, selected, balanceSource, onSelect} = props;

	return (
		<div className={'relative z-10 w-full space-y-2'}>
			<div className={'flex flex-row items-baseline justify-between'}>
				<label className={'text-base text-neutral-600'}>{label}</label>
				<legend className={'font-number inline text-xs text-neutral-600 md:hidden'} suppressHydrationWarning>
					{legend}
				</legend>
			</div>
			{(options.length > 1) ? (
				<Dropdown
					defaultOption={options[0]}
					options={options}
					selected={selected}
					balanceSource={balanceSource}
					onSelect={onSelect} />
			) : (
				<div className={'flex h-10 w-full items-center justify-between bg-neutral-0 px-2 text-base text-neutral-900 md:px-3'}>
					<div className={'relative flex flex-row items-center'}>
						<div key={selected?.value} className={'h-6 w-6 rounded-full'}>
							{selected?.icon}
						</div>
						<p className={'overflow-x-hidden text-ellipsis whitespace-nowrap pl-2 font-normal text-neutral-900 scrollbar-none'}>
							{selected?.symbol}
						</p>
					</div>
				</div>
			)}
			<legend className={'font-number hidden text-xs text-neutral-600 md:inline'} suppressHydrationWarning>
				{legend}
			</legend>
		</div>
	);
}

function Switch({tooltipText, onSwitchFromTo}: TSwitch): ReactElement {
	return (
		<div className={'mx-auto flex w-full justify-center space-y-0 md:mx-none md:block md:w-14 md:space-y-2'}>
			<label className={'hidden text-base md:inline'}>&nbsp;</label>

			<div className={'tooltip top'}>
				<Button onClick={onSwitchFromTo} className={'flex h-6 w-6 rotate-90 items-center justify-center bg-neutral-900 p-0 md:h-10 md:w-14 md:rotate-0'}>
					<span className={'sr-only'}>{tooltipText}</span>
					<IconArrowRight className={'w-4 text-neutral-0 md:w-[25px]'} />
				</Button>
				<span
					className={'tooltiptext'}
					style={{width: 120, marginRight: 'calc(-62px + 50%)'}}>
					<p>{tooltipText}</p>
				</span>
			</div>
			<legend className={'hidden text-xs md:inline'}>&nbsp;</legend>
		</div>
	);
}

function Input(props: TInput): ReactElement {
	const {label, legend, value, isDisabled, onChange, onSetMaxAmount} = props;

	return (
		<div className={'w-full space-y-2'}>
			<label htmlFor={label} className={'hidden text-base text-neutral-600 md:inline'}>
				{label}
			</label>
			<div className={`flex h-10 items-center ${isDisabled ? 'bg-neutral-300' : 'bg-neutral-0'} p-2`}>
				<div className={'flex h-10 w-full flex-row items-center justify-between py-4 px-0'}>
					<input
						id={label}
						className={`w-full overflow-x-scroll border-none bg-transparent py-4 px-0 font-bold outline-none scrollbar-none ${isDisabled ? 'cursor-not-allowed' : 'cursor-default'}`}
						type={'text'}
						disabled={isDisabled}
						value={value}
						onChange={onChange} />
					{onSetMaxAmount &&
						<button
							onClick={onSetMaxAmount}
							className={'ml-2 cursor-pointer bg-neutral-900 px-2 py-1 text-xs text-neutral-0 transition-colors hover:bg-neutral-700'}>
							{'Max'}
						</button>
					}
				</div>
			</div>
			<legend className={'font-number mr-1 text-end text-xs text-neutral-600 md:mr-0 md:text-start'}>
				{legend}
			</legend>
		</div>
	);
}

export function	QuickActions({label, children}: {label: string; children: ReactNode}): ReactElement {
	return (
		<section aria-label={label} className={'flex w-full flex-col space-x-0 md:flex-row md:space-x-4'}>
			{children}
		</section>
	);
}

QuickActions.Select = Select;
QuickActions.Switch = Switch;
QuickActions.Input = Input;
