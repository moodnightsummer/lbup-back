import { DataSource } from 'typeorm';
import { Exercise } from '../\bentity/Exercises';
import { MuscleGroup } from '../../commons/enums/muscle';
import { ExerciseCategory, EquipmentType } from '../../commons/enums/muscle';

export async function seedExercises(dataSource: DataSource) {
  const repo = dataSource.getRepository(Exercise);

  const count = await repo.count();
  if (count > 0) {
    console.log('이미 운동 항목이 저장되어 있습니다.');
    return;
  }

  await repo.save([
    // 가슴
    {
      name: '벤치 프레스',
      englishName: 'Bench Press',
      primaryMuscle: MuscleGroup.CHEST,
      category: ExerciseCategory.FREE_WEIGHT,
      equipment: EquipmentType.BARBELL,
      defaultRestSeconds: 120,
      incrementUnit: 2.5,
    },
    {
      name: '인클라인 벤치 프레스',
      englishName: 'Incline Bench Press',
      primaryMuscle: MuscleGroup.CHEST,
      category: ExerciseCategory.FREE_WEIGHT,
      equipment: EquipmentType.BARBELL,
      defaultRestSeconds: 120,
      incrementUnit: 2.5,
    },
    {
      name: '인클라인 덤벨 프레스',
      englishName: 'Incline Dumbbell Press',
      primaryMuscle: MuscleGroup.CHEST,
      category: ExerciseCategory.FREE_WEIGHT,
      equipment: EquipmentType.DUMBBELL,
    },
    {
      name: '덤벨 플라이',
      englishName: 'Dumbbell Fly',
      primaryMuscle: MuscleGroup.CHEST,
      category: ExerciseCategory.FREE_WEIGHT,
      equipment: EquipmentType.DUMBBELL,
    },
    {
      name: '체스트 프레스 머신',
      englishName: 'Chest Press Machine',
      primaryMuscle: MuscleGroup.CHEST,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    {
      name: '펙덱 플라이',
      englishName: 'Pec Deck Fly',
      primaryMuscle: MuscleGroup.CHEST,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    {
      name: '벤치 프레스 머신',
      englishName: 'Bench Press Machine',
      primaryMuscle: MuscleGroup.CHEST,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    {
      name: '인클라인 프레스 머신',
      englishName: 'Incline Press Machine',
      primaryMuscle: MuscleGroup.CHEST,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    {
      name: '디클라인 프레스 머신',
      englishName: 'Decline Press Machine',
      primaryMuscle: MuscleGroup.CHEST,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },

    // 등
    {
      name: '데드리프트',
      englishName: 'Deadlift',
      primaryMuscle: MuscleGroup.BACK,
      category: ExerciseCategory.FREE_WEIGHT,
      equipment: EquipmentType.BARBELL,
      defaultRestSeconds: 180,
    },
    {
      name: '바벨 로우',
      englishName: 'Barbell Row',
      primaryMuscle: MuscleGroup.BACK,
      category: ExerciseCategory.FREE_WEIGHT,
      equipment: EquipmentType.BARBELL,
    },
    {
      name: '덤벨 로우',
      englishName: 'Dumbbell Row',
      primaryMuscle: MuscleGroup.BACK,
      category: ExerciseCategory.FREE_WEIGHT,
      equipment: EquipmentType.DUMBBELL,
    },
    {
      name: '랫 풀다운',
      englishName: 'Lat Pulldown',
      primaryMuscle: MuscleGroup.BACK,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    {
      name: '시티드 로우 머신',
      englishName: 'Seated Row Machine',
      primaryMuscle: MuscleGroup.BACK,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    {
      name: '케이블 풀 다운',
      englishName: 'Cable Pull Down',
      primaryMuscle: MuscleGroup.BACK,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    {
      name: '바벨 로우 머신',
      englishName: 'Barbell Row Machine',
      primaryMuscle: MuscleGroup.BACK,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    {
      name: '로우 로우 머신',
      englishName: 'Low Row Machine',
      primaryMuscle: MuscleGroup.BACK,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    {
      name: '원암 시티드 로우 머신',
      englishName: 'One Arm Seated Row Machine',
      primaryMuscle: MuscleGroup.BACK,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    //하체

    {
      name: '스쿼트',
      englishName: 'Squat',
      primaryMuscle: MuscleGroup.LEG,
      category: ExerciseCategory.FREE_WEIGHT,
      equipment: EquipmentType.BARBELL,
      defaultRestSeconds: 180,
    },
    {
      name: '루마니안 데드리프트',
      englishName: 'Romanian Deadlift',
      primaryMuscle: MuscleGroup.LEG,
      category: ExerciseCategory.FREE_WEIGHT,
      equipment: EquipmentType.BARBELL,
    },
    {
      name: '덤벨 런지',
      englishName: 'Dumbbell Lunge',
      primaryMuscle: MuscleGroup.LEG,
      category: ExerciseCategory.FREE_WEIGHT,
      equipment: EquipmentType.DUMBBELL,
    },
    {
      name: '레그 프레스',
      englishName: 'Leg Press',
      primaryMuscle: MuscleGroup.LEG,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    {
      name: '레그 익스텐션',
      englishName: 'Leg Extension',
      primaryMuscle: MuscleGroup.LEG,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    {
      name: '레그 컬',
      englishName: 'Leg Curl',
      primaryMuscle: MuscleGroup.LEG,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },

    // 어깨
    {
      name: '오버헤드 프레스',
      englishName: 'Overhead Press',
      primaryMuscle: MuscleGroup.SHOULDER,
      category: ExerciseCategory.FREE_WEIGHT,
      equipment: EquipmentType.BARBELL,
    },
    {
      name: '사이드 레터럴 레이즈',
      englishName: 'Side Lateral Raise',
      primaryMuscle: MuscleGroup.SHOULDER,
      category: ExerciseCategory.FREE_WEIGHT,
      equipment: EquipmentType.DUMBBELL,
    },
    {
      name: '숄더 프레스 머신',
      englishName: 'Shoulder Press Machine',
      primaryMuscle: MuscleGroup.SHOULDER,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    {
      name: '리어 델트 머신',
      englishName: 'Rear Delt Machine',
      primaryMuscle: MuscleGroup.SHOULDER,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    {
      name: '사이드 레터럴 레이즈 머신',
      englishName: 'Side Lateral Raise Machine',
      primaryMuscle: MuscleGroup.SHOULDER,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    {
      name: '리버스 케이블 크로스오버',
      englishName: 'Reverse Cable Crossover',
      primaryMuscle: MuscleGroup.SHOULDER,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },

    // 팔
    {
      name: '바벨 컬',
      englishName: 'Barbell Curl',
      primaryMuscle: MuscleGroup.ARM,
      category: ExerciseCategory.FREE_WEIGHT,
      equipment: EquipmentType.BARBELL,
    },
    {
      name: '덤벨 컬',
      englishName: 'Dumbbell Curl',
      primaryMuscle: MuscleGroup.ARM,
      category: ExerciseCategory.FREE_WEIGHT,
      equipment: EquipmentType.DUMBBELL,
    },
    {
      name: '라잉 트라이셉스 익스텐션',
      englishName: 'Skull Crusher',
      primaryMuscle: MuscleGroup.ARM,
      category: ExerciseCategory.FREE_WEIGHT,
      equipment: EquipmentType.BARBELL,
    },
    {
      name: '케이블 바이셉스 컬',
      englishName: 'Cable Biceps Curl',
      primaryMuscle: MuscleGroup.ARM,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
    {
      name: '케이블 트라이셉스 푸시다운',
      englishName: 'Triceps Pushdown',
      primaryMuscle: MuscleGroup.ARM,
      category: ExerciseCategory.MACHINE,
      equipment: EquipmentType.MACHINE,
    },
  ]);
}
