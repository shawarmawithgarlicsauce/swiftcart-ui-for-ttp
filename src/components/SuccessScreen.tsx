import { useState } from 'react';
import { CheckCircle, Download, Mail, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface SuccessScreenProps {
  totalPrice: number;
  onExit: () => void;
}

export function SuccessScreen({ totalPrice, onExit }: SuccessScreenProps) {
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const handleExitClick = () => {
    setShowRatingDialog(true);
  };

  const handleStarClick = (starNumber: number) => {
    setRating(starNumber);
    setHasRated(true);
  };

  const handleFinalExit = () => {
    setShowRatingDialog(false);
    onExit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-600 p-4 rounded-full">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
        </div>

        <h1 className="mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with us
        </p>

        <Card className="p-4 mb-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Paid</span>
            <span className="text-2xl">RM {(totalPrice * 1.08).toFixed(2)}</span>
          </div>
        </Card>

        <div className="space-y-3 mb-6">
          <Button variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
          <Button variant="outline" className="w-full">
            <Mail className="w-4 h-4 mr-2" />
            Email Receipt
          </Button>
        </div>

        <Button className="w-full" size="lg" onClick={handleExitClick}>
          Exit & Return Trolley
        </Button>

        <p className="text-gray-500 text-sm mt-4">
          Thank you for using SwiftCart!
        </p>
      </Card>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Rate Your Experience</DialogTitle>
            <DialogDescription className="text-center">
              How would you rate your experience with SwiftCart?
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center gap-6 py-4">
            {/* Star Rating */}
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((starNumber) => (
                <button
                  key={starNumber}
                  onClick={() => handleStarClick(starNumber)}
                  onMouseEnter={() => setHoveredRating(starNumber)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`w-12 h-12 ${
                      starNumber <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-none text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Thank you message after rating */}
            {hasRated && (
              <div className="text-center">
                <p className="italic text-gray-700">
                  Your feedback using SwiftCart Trolley is much appreciated!
                </p>
              </div>
            )}

            {/* Continue button */}
            {hasRated && (
              <Button 
                onClick={handleFinalExit}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Continue to Exit
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
