import { Component, OnInit, signal } from '@angular/core';
import { SkillService, Skill } from '../../services/skill';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills implements OnInit {

  skills = signal<Skill[]>([]);
  backendSkills = signal<Skill[]>([]);
  frontendSkills = signal<Skill[]>([]);
  outilsSkills = signal<Skill[]>([]);
  methodesSkills = signal<Skill[]>([]);

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.skillService.getAllSkills().subscribe({
      next: (data) => {
        this.skills.set(data);
        this.backendSkills.set(data.filter(s => s.category === 'Backend'));
        this.frontendSkills.set(data.filter(s => s.category === 'Frontend'));
        this.outilsSkills.set(data.filter(s => s.category === 'Outils'));
        this.methodesSkills.set(data.filter(s => s.category === 'Méthodes'));
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des compétences', err);
      }
    });
  }
}