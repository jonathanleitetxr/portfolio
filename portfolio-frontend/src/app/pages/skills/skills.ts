import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { SkillService, Skill } from '../../services/skill';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-skills',
  imports: [FormsModule, DragDropModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills implements OnInit {

  skills = signal<Skill[]>([]);
  backendSkills = signal<Skill[]>([]);
  frontendSkills = signal<Skill[]>([]);
  methodesSkillsLeft = signal<Skill[]>([]);
  methodesSkillsRight = signal<Skill[]>([]);
  outilsSkillsLeft = signal<Skill[]>([]);
  outilsSkillsRight = signal<Skill[]>([]);

  isModalOpen = signal<boolean>(false);
  modalMode: 'create' | 'edit' = 'create';
  editingId: number | null = null;
  skillForm = { name: '', category: 'Backend', level: 50, displayOrder: 0 };

  constructor(
    private skillService: SkillService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.skillService.getAllSkills().subscribe({
      next: (data) => {
        this.skills.set(data);

        this.backendSkills.set(
          data.filter(s => s.category === 'Backend').sort((a, b) => b.level - a.level)
        );
        this.frontendSkills.set(
          data.filter(s => s.category === 'Frontend').sort((a, b) => b.level - a.level)
        );

        const outils = data.filter(s => s.category === 'Outils').sort((a, b) => a.displayOrder - b.displayOrder);
        const middleOutils = Math.ceil(outils.length / 2);
        this.outilsSkillsLeft.set(outils.slice(0, middleOutils));
        this.outilsSkillsRight.set(outils.slice(middleOutils));

        const methodes = data.filter(s => s.category === 'Méthodes').sort((a, b) => a.displayOrder - b.displayOrder);
        const middleMethodes = Math.ceil(methodes.length / 2);
        this.methodesSkillsLeft.set(methodes.slice(0, middleMethodes));
        this.methodesSkillsRight.set(methodes.slice(middleMethodes));
      },
      error: (err) => console.error('Erreur lors de la récupération des compétences', err)
    });
  }

  openCreateModal(category: string): void {
    this.modalMode = 'create';
    this.skillForm = { name: '', category, level: 50, displayOrder: 0 };
    this.isModalOpen.set(true);
  }

  openEditModal(skill: Skill): void {
    this.modalMode = 'edit';
    this.editingId = skill.id;
    this.skillForm = { name: skill.name, category: skill.category, level: skill.level, displayOrder: skill.displayOrder };
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  saveSkill(): void {
    if (this.modalMode === 'create') {
      this.skillService.createSkill(this.skillForm).subscribe({
        next: () => {
          this.loadSkills();
          this.isModalOpen.set(false);
        },
        error: (err) => console.error('Erreur création compétence', err)
      });
    } else if (this.editingId !== null) {
      this.skillService.updateSkill(this.editingId, this.skillForm).subscribe({
        next: () => {
          this.loadSkills();
          this.isModalOpen.set(false);
        },
        error: (err) => console.error('Erreur modification compétence', err)
      });
    }
  }

  deleteSkill(id: number): void {
    if (confirm('Supprimer cette compétence ?')) {
      this.skillService.deleteSkill(id).subscribe({
        next: () => this.loadSkills(),
        error: (err) => console.error('Erreur suppression compétence', err)
      });
    }
  }

  onOutilsDrop(event: CdkDragDrop<Skill[]>): void {
    if (event.previousContainer === event.container) {
      // Déplacement dans la même colonne
      const list = [...event.container.data];
      moveItemInArray(list, event.previousIndex, event.currentIndex);
      if (event.container.id === 'outilsLeft') {
        this.outilsSkillsLeft.set(list);
      } else {
        this.outilsSkillsRight.set(list);
      }
    } else {
      // Transfert d'une colonne à l'autre
      const sourceList = [...event.previousContainer.data];
      const destList = [...event.container.data];
      const [movedItem] = sourceList.splice(event.previousIndex, 1);
      destList.splice(event.currentIndex, 0, movedItem);

      if (event.previousContainer.id === 'outilsLeft') {
        this.outilsSkillsLeft.set(sourceList);
        this.outilsSkillsRight.set(destList);
      } else {
        this.outilsSkillsRight.set(sourceList);
        this.outilsSkillsLeft.set(destList);
      }
    }

    this.saveOutilsOrder();
  }

  saveOutilsOrder(): void {
    const allOutils = [...this.outilsSkillsLeft(), ...this.outilsSkillsRight()];
    allOutils.forEach((skill, index) => {
      this.skillService.updateSkill(skill.id, { ...skill, displayOrder: index }).subscribe();
    });
  }

  onMethodesDrop(event: CdkDragDrop<Skill[]>): void {
    if (event.previousContainer === event.container) {
      const list = [...event.container.data];
      moveItemInArray(list, event.previousIndex, event.currentIndex);
      if (event.container.id === 'methodesLeft') {
        this.methodesSkillsLeft.set(list);
      } else {
        this.methodesSkillsRight.set(list);
      }
    } else {
      const sourceList = [...event.previousContainer.data];
      const destList = [...event.container.data];
      const [movedItem] = sourceList.splice(event.previousIndex, 1);
      destList.splice(event.currentIndex, 0, movedItem);

      if (event.previousContainer.id === 'methodesLeft') {
        this.methodesSkillsLeft.set(sourceList);
        this.methodesSkillsRight.set(destList);
      } else {
        this.methodesSkillsRight.set(sourceList);
        this.methodesSkillsLeft.set(destList);
      }
    }

    this.saveMethodesOrder();
  }

  saveMethodesOrder(): void {
    const allMethodes = [...this.methodesSkillsLeft(), ...this.methodesSkillsRight()];
    allMethodes.forEach((skill, index) => {
      this.skillService.updateSkill(skill.id, { ...skill, displayOrder: index }).subscribe();
    });
  }
}