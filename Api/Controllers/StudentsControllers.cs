using System.Runtime.CompilerServices;
using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsControllers:ControllerBase
    {
        private readonly AppDbContext _context;
        public StudentsControllers(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IEnumerable<Student>> GetStudents()
        {
            var students = await _context.Students.AsNoTracking().ToListAsync();
            return students;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Student student)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _context.AddAsync(student);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Student>> GetSudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student is null)
                return NotFound();
            
            return Ok(student);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if(student is null)
                return NotFound();
            _context.Remove(student);
            var result = await _context.SaveChangesAsync();
            if (result>0)
                return Ok("Student Delete");
            return BadRequest("Unable to delete student");
        }
        [HttpPut("{id:int}")]
        // api/students/1
        public async Task<IActionResult> EditStudent(int id, Student student)
        {
            var studentFromDb = await _context.Students.FindAsync(id);
            if (studentFromDb is null)
                return BadRequest("Student not found");
            studentFromDb.Name = student.Name;
            studentFromDb.Address = student.Address;
            studentFromDb.PhoneNumber = student.PhoneNumber;
            studentFromDb.Email = student.Email;
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok("Student Sucessfully updated");
            }
            return BadRequest("Unable to update data");

        }
    }
}