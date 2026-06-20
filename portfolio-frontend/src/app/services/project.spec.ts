import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectService, Project } from './project';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });

    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('devrait récupérer tous les projets', () => {
    const faux_projets: Project[] = [
      { id: 1, title: 'New Pilote', description: 'desc', technologies: 'JS,PHP', imageUrl: '', githubUrl: '', demoUrl: '', featured: true, slides: [] }
    ];

    service.getAllProjects().subscribe(projects => {
      expect(projects.length).toBe(1);
      expect(projects[0].title).toBe('New Pilote');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/projects');
    expect(req.request.method).toBe('GET');
    req.flush(faux_projets);
  });
});