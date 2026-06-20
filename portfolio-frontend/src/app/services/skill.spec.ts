import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SkillService, Skill } from './skill';

describe('SkillService', () => {
  let service: SkillService;
  let httpMock: HttpTestingController;

  // beforeEach s'exécute avant CHAQUE test, pour repartir sur une base propre
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SkillService]
    });

    service = TestBed.inject(SkillService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // afterEach vérifie qu'aucune requête HTTP n'est restée "en attente" après le test
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('devrait récupérer toutes les compétences', () => {
    const fausses_competences: Skill[] = [
      { id: 1, name: 'Java', category: 'Backend', level: 70 },
      { id: 2, name: 'Angular', category: 'Frontend', level: 60 }
    ];

    // On appelle la méthode du service qu'on veut tester
    service.getAllSkills().subscribe(skills => {
      expect(skills.length).toBe(2);
      expect(skills[0].name).toBe('Java');
    });

    // On intercepte la requête HTTP que le service a déclenchée
    const req = httpMock.expectOne('http://localhost:8080/api/skills');
    expect(req.request.method).toBe('GET');

    // On simule la réponse du serveur avec nos fausses données
    req.flush(fausses_competences);
  });
});