const CircularProgress = (props) => {
	// eslint-disable-next-line react/prop-types
	const normalizedPercentage = Math.min(100, Math.max(0, props.percentage));

	const radius = 20;
	const circumference = 2 * Math.PI * radius;

	const offset = circumference - (normalizedPercentage / 100) * circumference;

	return (
		<div className="relative inline-flex items-center justify-center">
			<svg className="w-16 h-16 transform -rotate-90">
				<circle
					className="text-blue-600"
					strokeWidth="3"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					stroke="currentColor"
					fill="transparent"
					r={radius}
					cx="32"
					cy="32"
				/>
			</svg>
			<div className="absolute text-xs font-medium">
				50%
			</div>
		</div>
	)
};

export default CircularProgress;