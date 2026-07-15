import { ChartsContainer } from '@mui/x-charts/ChartsContainer';
import { LinePlot, MarkPlot, lineClasses } from '@mui/x-charts/LineChart';
type Props = {
    data: number[];
};
export function Chart({data}:Props){

return(
<ChartsContainer
      
      height={150}
      series={[{ type: 'line', data: data, showMark: true }]}
    xAxis={[{ scaleType: 'point', data: data, position: 'none' }]}
      yAxis={[{ position: 'none' }]}
      sx={{
        [`& .${lineClasses.line}`]: {
          stroke: 'red',
          strokeWidth: 3,
        },
        [`& .${lineClasses.mark}`]: {
          stroke: '#ff0000',
          r: 0, // Modify the circle radius
          fill: '#fff',
          strokeWidth: 2,
        },
      }}
      disableAxisListener
    >
      <LinePlot />
      <MarkPlot />
    </ChartsContainer>
)
}