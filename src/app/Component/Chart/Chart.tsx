'use client';

import { ChartTodoType } from '@/Types/Todo';
import { TodoType } from '@/Types/Todo';
import * as d3 from 'd3';
import React, { useRef, useEffect, Dispatch, SetStateAction } from 'react';

type PieChartProps = {
  data: ChartTodoType[];
  setSelected: Dispatch<SetStateAction<TodoType | null>>;
};

const PieChart = ({ data, setSelected }: PieChartProps) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 400;
    const height = 400;
    const radius = Math.min(width * (5 / 6), height * (5 / 6)) / 2;

    const color = d3.scaleOrdinal<string, string>(d3.schemeCategory10);

    const pie = d3.pie<ChartTodoType>().value(d => d.totalTime);
    const arc = d3.arc<d3.PieArcDatum<ChartTodoType>>().innerRadius(0).outerRadius(radius);

    // 초기화 (중복 방지)
    d3.select(ref.current).selectAll('*').remove();

    // SVG 뷰박스 설정
    const svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`) // 뷰박스 추가
      .attr('preserveAspectRatio', 'xMidYMid meet') // 비율을 맞춰서 확대/축소
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcs = pie(data);

    svg
      .selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arc as any) // 타입 에러 방지
      .attr('fill', (_, i) => color(String(i)))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('cursor', 'pointer')
      .on('click', function (event, d) {
        svg
          .selectAll('path')
          .transition()
          .duration(300)
          .attr('transform', 'translate(0,0) scale(1)')
          .style('opacity', 1)
          .style('stroke-width', '2px')
          .style('stroke', 'white'); // 원래 stroke로

        // 2. 클릭한 조각의 중심 좌표 구해서 살짝 이동
        const [x, y] = arc.centroid(d);
        const offsetX = x * 0.2; // 살짝 튀어나오게 (비율 조절 가능)
        const offsetY = y * 0.2;

        d3.select(event.currentTarget)
          .transition()
          .duration(300)
          .attr('transform', `translate(${offsetX}, ${offsetY}) scale(1.1)`) // scale을 조금 더 크게
          .style('opacity', 0.6)
          .style('stroke', '#222')
          .style('stroke-width', '5px');

        setSelected(d.data);
      });

    svg
      .selectAll('text')
      .data(arcs)
      .enter()
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data.head)
      .style('font-size', '12px');
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default PieChart;
