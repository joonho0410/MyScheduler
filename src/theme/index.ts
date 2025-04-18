'use client'

import { createTheme, responsiveFontSizes } from "@mui/material/styles"; // ThemeProvider를 올바르게 임포트
import palette from "./palette";

// 테마 생성
let theme = createTheme({
    palette,
});

// 반응형 폰트 크기 설정
theme = responsiveFontSizes(theme);

export default theme
