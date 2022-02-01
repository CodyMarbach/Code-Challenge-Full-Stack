using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Code_Challenge_Full_Stack.Models
{
    public class Boat
    {
        [Key]
        public int Id { get; set; }

        // Deliberate choice to have backing datastore be larger, to allow for easier expansion in the future.
        [Column(TypeName = "nvarchar(100)")]
        [Required]
        [StringLength(32)]
        public string Name { get; set; }
        public BoatStatus Status { get; set; }
        [StringLength(200)]
        public string Notes { get; set; }
    }
}
