export interface LessonModel {
  id: number;
  theme: string;
  subject: string;
  course: string;
  duration: string;
  rationale: string;
  objectives: string;
  activities: string;
  resources: string;
  assessment: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published';
}
