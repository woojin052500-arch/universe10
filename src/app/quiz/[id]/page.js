import { OBJECTS } from '@/data/content';
import QuizView from './QuizView';

export function generateStaticParams() {
  return OBJECTS.map((o) => ({ id: o.id }));
}

export default function Page() {
  return <QuizView />;
}
