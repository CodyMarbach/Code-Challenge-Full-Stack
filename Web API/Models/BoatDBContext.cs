using Microsoft.EntityFrameworkCore;

namespace Code_Challenge_Full_Stack.Models
{
    public class BoatDBContext : DbContext
    {
        public DbSet<Boat> Boats { get; set; }
        public BoatDBContext(DbContextOptions<BoatDBContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Boat>()
                .Property(c => c.Status)
                .HasConversion<int>();

            base.OnModelCreating(modelBuilder);
        }
    }
}
