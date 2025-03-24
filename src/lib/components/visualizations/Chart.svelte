<script lang="ts">
	import type { TransactionsResponse } from '$lib/types/db';
	import { Chart } from 'chart.js/auto';
	import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
	import dayjs from 'dayjs';
	import type { ListResult } from 'pocketbase';
	import { getRelativePosition } from 'chart.js/helpers';

	let ref = $state<HTMLCanvasElement>();

	let {
		transactions,
		hoveredValue = $bindable(0),
		totalBalance = $bindable(0)
	}: {
		transactions: {
			response: ListResult<TransactionsResponse<unknown>> | null;
		};
		hoveredValue: number;
    totalBalance: number;
	} = $props();

	let array = $state<{ date: string; balance: number }[]>([]);

	let tries = $state(0);

	$effect(() => {
		if (!transactions.response || tries !== 0) return;

		tries++;

		const reversedTransactions = transactions.response.items.toReversed();

		array = [
			{
				date: dayjs(reversedTransactions[0].timestamp).format('YYYY-MM-DD'),
				balance: 0
			}
		];

		for (const index in reversedTransactions) {
			const transactionDate = dayjs(reversedTransactions[index].timestamp).format('YYYY-MM-DD');

			if (transactionDate !== array[array.length - 1].date) {
				array.push({
					date: transactionDate,
					balance: array[array.length - 1].balance
				});
			}
			array[array.length - 1].balance -= reversedTransactions[index].amount;
		}

		hoveredValue = array[array.length - 1].balance;
    totalBalance = hoveredValue;
	});

	$inspect(array);

	$effect(() => {
		const chart = new Chart(ref!, {
			type: 'line',
			data: {
				datasets: [
					{
						// label: 'Bar Dataset',
						data: array.map((i) => ({ x: i.date, y: i.balance })),
						order: 2,
						fill: true,
						borderColor: '#00bc7d',
						backgroundColor: '#00bc7d90',
						pointStyle: false,
						stepped: true
					}
				]
			},
			options: {
				scales: {
					y: {
						// display: false,
						min: 0
					},
					x: {
						type: 'time',
						display: true,
						min: transactions.response?.items[transactions.response?.items.length - 1].timestamp,
						time: {
							displayFormats: {
								quarter: 'MMM YYYY'
							}
						}
					}
				},
				plugins: {
					tooltip: {
						mode: 'index'
					},
					legend: {
						display: false
					}
				},
				interaction: {
					mode: 'nearest',
					axis: 'x',
					intersect: false
				},
				onHover: (e) => {
					const canvasPosition = getRelativePosition(e, chart as any);

					const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
					const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
					console.log(dataX);
					console.log(dataY);

					hoveredValue = dataY || 0;
				}
			}
		});

		return () => chart.destroy();
	});

	$inspect(ref);
</script>

<canvas bind:this={ref} class="h-[50vh] w-full"></canvas>
