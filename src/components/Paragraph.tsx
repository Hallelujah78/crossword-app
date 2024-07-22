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
  margin: 3rem auto 3rem auto;
  width: 90%;
`;
