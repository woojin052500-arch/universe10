'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Background from '@/components/Background';
import LevelUpOverlay from '@/components/LevelUpOverlay';
import { IconClose, IconCheck } from '@/components/Icons';
import { getObject, getLevel, objectsOfLevel } from '@/data/content';
import useProgress from '@/lib/useProgress';
import { currentScale, willUnlockNext } from '@/lib/progress';

export default function QuizView() {
  const { id } = useParams();
  const router = useRouter();
  const obj = getObject(id);

  const [picked, setPicked] = useState(null);   // 선택한 보기 index
  const [levelUp, setLevelUp] = useState(null); // { from, to, levelId }

  const { completed, complete } = useProgress();

  if (!obj) return <main className="page" />;

  const lv = getLevel(obj.level);
  const list = objectsOfLevel(obj.level);
  const step = list.findIndex((o) => o.id === obj.id) + 1;
  const isCorrect = picked === obj.quiz.answer;

  function pick(i) {
    if (picked !== null) return;
    setPicked(i);
    if (i !== obj.quiz.answer) return;

    // 정답 → 진도 저장 + 레벨업 판정
    const snap = completed || [];
    const fromScale = currentScale(snap);
    const unlocked = willUnlockNext(obj.id, snap);
    complete(obj.id);
    const toScale = currentScale([...snap, obj.id]);

    if (unlocked) {
      setTimeout(() => setLevelUp({ from: fromScale, to: toScale, levelId: unlocked }), 900);
    }
  }

  function done() {
    router.push('/universe');
  }

  return (
    <>
      <Background variant="max" />
      <main className="page" style={{ minHeight: '100dvh', maxWidth: 680 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 64 }}>
          <button onClick={() => router.back()} aria-label="닫기"
            style={{ color: 'var(--muted)', flexShrink: 0 }}><IconClose /></button>
          <div className="prog" style={{ flex: 1 }}>
            <i style={{ width: `${(step / list.length) * 100}%`, background: lv.color }} />
          </div>
          <span style={{ fontSize: 12, color: 'var(--muted)', flexShrink: 0 }}>
            {step} / {list.length}
          </span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', paddingBottom: 20 }}>
          <div className="eyebrow" style={{ color: lv.color, marginBottom: 16 }}>확장 퀴즈</div>
          <h1 style={{
            fontSize: 'clamp(21px,4.4vw,32px)', fontWeight: 800, color: '#fff',
            lineHeight: 1.6, letterSpacing: '-.035em', marginBottom: 32,
          }}>{obj.quiz.q}</h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {obj.quiz.options.map((opt, i) => {
              let cls = 'opt';
              if (picked !== null) {
                if (i === obj.quiz.answer) cls += ' correct';
                else if (i === picked) cls += ' wrong';
                else cls += ' dim';
              }
              return (
                <button key={i} className={cls} disabled={picked !== null}
                  onClick={() => pick(i)}>
                  <span>{['①', '②', '③'][i]} {opt}</span>
                  {picked !== null && i === obj.quiz.answer &&
                    <IconCheck style={{ color: 'var(--ok)', flexShrink: 0 }} />}
                  {picked !== null && i === picked && i !== obj.quiz.answer &&
                    <IconClose size={18} style={{ color: 'var(--no)', flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>
        </div>

        {picked !== null && (
          <div style={{ paddingBottom: 30 }}>
            <div style={{
              background: 'var(--card)', borderLeft: `2.5px solid ${lv.color}`,
              padding: '16px 18px', borderRadius: '0 13px 13px 0',
              fontSize: 13.5, lineHeight: 1.8, marginBottom: 14,
            }} dangerouslySetInnerHTML={{ __html: obj.quiz.explain }} />

            {isCorrect ? (
              <button className="btn btn-p" onClick={done}>우주 지도로</button>
            ) : (
              <button className="btn" onClick={() => setPicked(null)}>다시 풀기</button>
            )}
          </div>
        )}
      </main>

      {levelUp && (
        <LevelUpOverlay
          fromScale={levelUp.from} toScale={levelUp.to} levelId={levelUp.levelId}
          onClose={done} />
      )}
    </>
  );
}
