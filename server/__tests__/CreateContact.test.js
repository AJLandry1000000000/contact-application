import { createContact } from '../controller/contact.js';
import Contact from '../model/contact.js';
import User from '../model/user.js';

jest.mock('../model/contact.js');
jest.mock('../model/user.js');

describe('createContact', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { userId: 'user123', name: 'John Doe', number: '1234567890', address: '5 Moore St' },
      user: { _id: 'user123' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Function should return 400 if any contact field is missing: userId', async () => {
    req.body.userId = '';
    await createContact(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Please fill in all the contact fields.' });
  });

  it('Function should return 400 if any contact field is missing: name', async () => {
    req.body.name = '';
    await createContact(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Please fill in all the contact fields.' });
  });

  it('Function should return 400 if any contact field is missing: number', async () => {
    req.body.number = '';
    await createContact(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Please fill in all the contact fields.' });
  });

  it('Function should return 400 if any contact field is missing: address', async () => {
    req.body.address = '';
    await createContact(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Please fill in all the contact fields.' });
  });

  it('Function should return 403 if user is not authorized to modify that user\'s data. ', async () => {
    req.user._id = 'NOT_user123';
    await createContact(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'You are not authorized to create a contact for this user.' });
  });

  it('Function should return 400 if phone number is too small.', async () => {
    req.body.number = '123';
    await createContact(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Please enter a valid 10 digit phone number.' });
  });

  it('Function should return 400 if phone number is not a number', async () => {
    req.body.number = 'this is not a number';
    await createContact(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Please enter a valid 10 digit phone number.' });
  });

  it('Function should return 404 if user is not found.', async () => {
    User.findById.mockResolvedValue(null);
    await createContact(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found.' });
  });

  it('Function should return 200 if contact already exists.', async () => {
    User.findById.mockResolvedValue({});
    Contact.findOne.mockResolvedValue({});
    await createContact(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Contact already exists.' });
  });

  it('Function should return 200 if it can successfully create a new contact.', async () => {
    User.findById.mockResolvedValue({});
    Contact.findOne.mockResolvedValue(null);
    const mockWithSaveMethod = {
      ...req.body,
      save: jest.fn()
    }
    Contact.mockImplementation(() => {
      return mockWithSaveMethod;
    });
    await createContact(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockWithSaveMethod);
  });

  it('Function should return 500 if there is a server error.', async () => {
    User.findById.mockRejectedValue(new Error('Server error'));
    await createContact(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
  });
});