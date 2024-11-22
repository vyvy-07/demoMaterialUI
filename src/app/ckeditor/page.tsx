'use client';
import dynamic from 'next/dynamic';

const CustomEditor = dynamic(() => import('@/components/ck'), {
  ssr: false,
});

function CkEditor() {
  return (
    <>
      <CustomEditor />
    </>
  );
}

export default CkEditor;
