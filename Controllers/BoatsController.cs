using Code_Challenge_Full_Stack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Code_Challenge_Full_Stack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoatsController : ControllerBase
    {
        private readonly BoatDBContext _context;

        public BoatsController(BoatDBContext context)
        {
            _context = context;
        }

        // GET: api/boats
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Boat>>> GetBoats()
        {
            return await _context.Boats.ToListAsync();
        }

        // GET api/boats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Boat>> Get(int id)
        {
            var boat = await _context.Boats.FindAsync(id);

            if(boat == null)
            {
                return NotFound(); 
            }

            return boat;
        }

        // POST api/boats
        [HttpPost]
        public async Task<ActionResult<Boat>> Post(Boat boat)
        {
            _context.Boats.Add(boat);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetBoat", new {id = boat.Id}, boat);
        }

        // PUT api/boats/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Boat boat)
        {
            if(id != boat.Id)
            {
                return BadRequest();
            }

            _context.Entry(boat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!BoatExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE api/boats/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Boat>> Delete(int id)
        {
            var boat = await _context.Boats.FindAsync(id);
            if(boat == null)
            {
                return NotFound();
            }

            _context.Boats.Remove(boat);
            await _context.SaveChangesAsync();

            return boat;
        }

        private bool BoatExists(int id)
        {
            return _context.Boats.Any(e => e.Id == id);
        }
    }
}
