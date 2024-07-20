import type { FC } from "react";
import styled from "styled-components";

interface ParagraphProps {
  text: string;
}

const Paragraph: FC<ParagraphProps> = ({ text }) => {
  return <Wrapper>{text}</Wrapper>;
};

export default Paragraph;

const Wrapper = styled.p`
  margin: 3rem 0 3rem 0;
`;
